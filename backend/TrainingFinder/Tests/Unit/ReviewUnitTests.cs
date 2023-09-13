using AutoMapper;
using BLL.App;
using DAL.EF.App;
using DAL.EF.App.Seeding;
using Domain.App.Identity;
using Microsoft.EntityFrameworkCore;


namespace Tests.Unit;

public class ReviewUnitTests
{
    public class ApiReviewUnitTests
    {
        private readonly IMapper _imapper;
        private readonly ReviewService _reviewService;
        private readonly ApplicationDbContext _ctx;


        public ApiReviewUnitTests()
        {
            // set up mock database - inMemory
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            // use random guid as db instance id
            optionsBuilder.UseInMemoryDatabase(Guid.NewGuid().ToString());

            _ctx = new ApplicationDbContext(optionsBuilder.Options);

            // reset db
            _ctx.Database.EnsureDeleted();
            _ctx.Database.EnsureCreated();

            _reviewService = new ReviewService(new AppUOW(_ctx), new BLL.App.Mappers.ReviewsMapper(_imapper));


            InitialAddUsers();

            AppDataInit.SeedAppData(_ctx);
        }

        public async Task InitialAddUsers()
        {
            (Guid id, string email, string pwd) userData = (Guid.Parse("378e2b3c-829c-48c6-83dc-fa2aab6b0709"),
                "admin@app.com", "Qwerty.1");

            var user = new AppUser()
            {
                Id = userData.id,
                Email = userData.email,
                UserName = userData.email,
                RegisteredAt = DateTime.Now,
                FirstName = "Admin",
                LastName = "App",
                Image =
                    "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png",
                EmailConfirmed = true
            };


            (Guid id, string email, string pwd) userDataTwo = (Guid.Parse("bab13710-46bc-4df4-ad1f-37c5c65ac704"),
                "admin@app.com", "Qwerty.1");
            var userTwo = new AppUser()
            {
                Id = userDataTwo.id,
                Email = userDataTwo.email,
                UserName = userDataTwo.email,
                RegisteredAt = DateTime.Now,
                FirstName = "AdminTwo",
                LastName = "AppTwo",
                Image =
                    "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png",
                EmailConfirmed = true
            };

            await _ctx.Users.AddAsync(user);
            await _ctx.Users.AddAsync(userTwo);

            await _ctx.SaveChangesAsync();
        }


        [Fact(DisplayName = "POST - ADD REVIEW")]
        public async Task testAddReview()
        {
            var bllReview = new BLL.DTO.Review()
            {
                Id = Guid.NewGuid(),
                AppUserId = Guid.Parse("378e2b3c-829c-48c6-83dc-fa2aab6b0709"),
                CreatedByUserId = Guid.Parse("bab13710-46bc-4df4-ad1f-37c5c65ac704"),
                Text = "test!",
                CreatedAt = DateTime.Now
            };

            var review = _reviewService.Add(bllReview);

            await _ctx.SaveChangesAsync();

            var check = await _ctx.Reviews.ToListAsync();
        }
    }
}