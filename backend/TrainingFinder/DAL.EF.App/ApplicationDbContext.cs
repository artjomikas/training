using Domain.App;
using Domain.App.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Public.DTO.v1;

namespace DAL.EF.App;

public class ApplicationDbContext : IdentityDbContext<AppUser, AppRole, Guid>
{
    public DbSet<Comment> Comments { get; set; } = default!;
    public DbSet<Intensity> Intensities { get; set; } = default!;
    public DbSet<Location> Locations { get; set; } = default!;
    public DbSet<Review> Reviews { get; set; } = default!;

    public DbSet<SkillLevel> SkillLevels { get; set; } = default!;

    // public DbSet<Client> Clients { get; set; }
    public DbSet<Workout> Workouts { get; set; } = default!;
    public DbSet<WorkoutType> WorkoutTypes { get; set; } = default!;
    public DbSet<WorkoutUser> WorkoutUsers { get; set; } = default!;

    public DbSet<AppRefreshToken> AppRefreshTokens { get; set; } = default!;
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Review>()
            .HasOne(e => e.AppUser) // reference
            .WithMany(e => e.Reviews) // collection
            .OnDelete(DeleteBehavior.NoAction);
        
        modelBuilder.Entity<Review>()
            .HasOne(e => e.CreatedByUser) // reference
            .WithMany() // no collection
            .OnDelete(DeleteBehavior.NoAction);

        base.OnModelCreating(modelBuilder);

        foreach (var foreignKey in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
}