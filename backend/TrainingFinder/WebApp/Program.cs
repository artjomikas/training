using System.Text;
using Asp.Versioning;
using Asp.Versioning.ApiExplorer;
using BLL.App;
using BLL.Contracts.App;
using DAL.Contracts.App;
using DAL.EF.App;
using DAL.EF.App.Seeding;
using Domain.App.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.SwaggerGen;
using WebApp;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                       throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));


//register UOW with scoped lifecycle
builder.Services.AddScoped<IAppUOW, AppUOW>();

//register BLL with scoped lifecycle
builder.Services.AddScoped<IAppBLL, AppBLL>();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();


// USER
builder.Services
    .AddIdentity<AppUser, AppRole>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddDefaultTokenProviders()
    .AddDefaultUI()
    .AddEntityFrameworkStores<ApplicationDbContext>();



builder.Services
    .AddAuthentication()
    .AddCookie(options => { options.SlidingExpiration = true; })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidIssuer = builder.Configuration.GetValue<string>("JWT:Issuer")!,
            ValidAudience = builder.Configuration.GetValue<string>("JWT:Audience")!,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("JWT:Key")!)),
            ClockSkew = TimeSpan.Zero,
        };
    });


builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsAllowAll", policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });
});

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);
// reference any class from class library to be scanned for mapper configurations
builder.Services.AddAutoMapper(
    typeof(BLL.App.AutoMapperConfig),
    typeof(Public.DTO.AutoMapperConfig)
);

var apiVersioningBuilder = builder.Services.AddApiVersioning(options =>
    {
        options.ReportApiVersions = true;
        // in case of no explicit version
        options.DefaultApiVersion = new ApiVersion(1, 0);
    }
);

apiVersioningBuilder.AddApiExplorer(options =>
{
    // add the versioned api explorer, which also adds IApiVersionDescriptionProvider service
    // note: the specified format code will format the version as "'v'major[.minor][-status]"
    options.GroupNameFormat = "'v'VVV";

    // note: this option is only necessary when versioning by url segment. the SubstitutionFormat
    // can also be used to control the format of the API version in route templates
    options.SubstituteApiVersionInUrl = true;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
builder.Services.AddSwaggerGen();


var app = builder.Build();


AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);


SetupAppData(app, app.Environment, app.Configuration);


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("CorsAllowAll");

app.UseAuthorization();

app.UseSwagger();

app.UseSwaggerUI(options =>
{
    var provider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>(); 
    foreach ( var description in provider.ApiVersionDescriptions )
    {
        options.SwaggerEndpoint(
            $"/swagger/{description.GroupName}/swagger.json",
            description.GroupName.ToUpperInvariant() 
        );
    }
    // serve from root
    // options.RoutePrefix = string.Empty;
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();




app.Run();

void SetupAppData(IApplicationBuilder app, IWebHostEnvironment env, IConfiguration config)
{
    using var serviceScope = app.ApplicationServices // IServiceProvider
        .GetRequiredService<IServiceScopeFactory>() // ServiceScopeFactory
        .CreateScope();
    using var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
    if (context == null)
    {
        throw new ApplicationException(message: "Problem in services. Can't initialize DB Context");
    }

    using var userManager = serviceScope.ServiceProvider.GetService<UserManager<AppUser>>();
    using var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<AppRole>>();

    if (userManager == null || roleManager == null)
    {
        throw new AggregateException("Problem in services. Can't initialize user or role manager");
    }

    var logger = serviceScope.ServiceProvider.GetService<ILogger<IApplicationBuilder>>();
    if (logger == null)
    {
        throw new ApplicationException(message: "Problem in services. Can't initialize logger");
    }

    if (context.Database.ProviderName!.Contains("InMemory"))
    {
        return;
    }

    if (config.GetValue<bool>(key: "DataInit:DropDatabase"))
    {
        logger.LogWarning(message: "Dropping database");
        AppDataInit.DropDatabase(context);
    }

    if (config.GetValue<bool>(key: "DataInit:MigrateDatabase"))
    {
        logger.LogWarning(message: "Migrating database");
        AppDataInit.MigrateDatabase(context);
    }

    if (config.GetValue<bool>(key: "DataInit:SeedIdentity"))
    {
        logger.LogWarning(message: "Seeding identity");
        AppDataInit.SeedIdentity(userManager, roleManager);
    }

    if (config.GetValue<bool>(key: "DataInit:SeedData"))
    {
        logger.LogWarning(message: "Seed app data");
        AppDataInit.SeedAppData(context);
    }
}

public partial class Program
{
}