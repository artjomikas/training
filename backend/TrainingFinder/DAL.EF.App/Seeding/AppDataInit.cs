using Domain.App;
using Domain.App.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DAL.EF.App.Seeding;

public static class AppDataInit
{
    private static Guid adminId = Guid.Parse("378e2b3c-829c-48c6-83dc-fa2aab6b0709");

    public static void MigrateDatabase(ApplicationDbContext context)
    {
        context.Database.Migrate();
    }

    public static void DropDatabase(ApplicationDbContext context)
    {
        context.Database.EnsureDeleted();
    }

    public static void SeedIdentity(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        (Guid id, string email, string pwd) userData = (adminId, "admin@app.com", "Qwerty.1");
        var user = userManager.FindByEmailAsync(userData.email).Result;
        if (user == null)
        {
            user = new AppUser()
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

            var result = userManager.CreateAsync(user, userData.pwd).Result;

            if (!result.Succeeded)
            {
                throw new ApplicationException("Can't see users");
            }
        }
    }

    public static void SeedAppData(ApplicationDbContext context)
    {
        SeedAppDataLocation(context);
        SeedAppDataIntensity(context);
        SeedAppDataSkillLevel(context);
        SeedAppDataWorkoutType(context);
        
         context.SaveChanges();
    }

    private static void SeedAppDataLocation(ApplicationDbContext context)
    {
        if (context.Locations.Any()) return;

        context.Locations.Add(new Location()
        {
            Id = Guid.NewGuid(),
            Name = "Gym Tehnopol",
            Latitude = 4.3,
            Longitude = 5.2
        });
    }

    private static void SeedAppDataWorkout(ApplicationDbContext context)
    {
        // {
        //     "name": "dwad",
        //     "price": "3",
        //     "workoutTypeId": "2c1e486d-ba56-4a7a-952e-e63095b78087",
        //     "intensityId": "71e01d56-e700-4a54-b763-8d588791c8ff",
        //     "skillLevelId": "c0473f8c-dc12-4456-a92e-0f85d91a526e",
        //     "maxParticipants": "2",
        //     "description": "dd",
        //     "image": "https://res.cloudinary.com/taltech/image/upload/c_fit,w_500/v1682152854/photo-1517963628607-235ccdd5476c_zkewti.webp",
        //     "location": {
        //         "name": "Õismäe Tee 2",
        //         "latitude": 59.415273,
        //         "longitude": 24.653708
        //     },
        //     "startDate": "2023-05-25T18:25:17.566Z",
        //     "endDate": "2023-05-25T18:25:17.566Z",
        //     "appUserId": "f64d5d85-2d56-40fd-baa3-61f8e18cf20c"
        // }
        //

        if (context.Workouts.Any()) return;

        context.Workouts.Add(new Workout()
        {
            Id = Guid.NewGuid(),
            Name = "Gym Tehnopol",
            Description = "Hi",
            WorkoutTypeId = Guid.Parse("2c1e486d-ba56-4a7a-952e-e63095b78087"),
            SkillLevelId = Guid.Parse("71e01d56-e700-4a54-b763-8d588791c8ff"),
            IntensityId = Guid.Parse("c0473f8c-dc12-4456-a92e-0f85d91a526e"),
            MaxParticipants = 2,
            Image = "",
            Location = new Location()
            {
                Name = "Oismae 2",
                Latitude = 59.415273,
                Longitude = 24.653708
            },
            StartDate = DateTime.Now,
            EndDate = DateTime.Now,
            AppUserId = Guid.Parse("378e2b3c-829c-48c6-83dc-fa2aab6b0709")
        });
    }


    private static void SeedAppDataIntensity(ApplicationDbContext context)
    {
        if (context.Intensities.Any()) return;
        context.Intensities.Add(
            new Intensity()
            {
                Id = Guid.Parse("71e01d56-e700-4a54-b763-8d588791c8ff"),
                Name = "Very Light",
            }
        );

        context.Intensities.Add(
            new Intensity()
            {
                Id = Guid.Parse("b5bbfa68-f145-4016-8c3e-222f9d47d61f"),
                Name = "Light",
            }
        );

        context.Intensities.Add(
            new Intensity()
            {
                Id = Guid.Parse("49d8b632-c36e-449e-a645-bcc4329ebe97"),
                Name = "Moderate",
            }
        );

        context.Intensities.Add(
            new Intensity()
            {
                Id = Guid.Parse("45a6994c-ca06-4683-8fba-37e618593615"),
                Name = "Hard",
            }
        );

        context.Intensities.Add(
            new Intensity()
            {
                Id = Guid.Parse("9a1090f4-2abd-4ae4-960c-6c316900e9d4"),
                Name = "Extremely Hard",
            }
        );
    }

    private static void SeedAppDataWorkoutType(ApplicationDbContext context)
    {
        if (context.WorkoutTypes.Any()) return;

        context.WorkoutTypes.Add(new WorkoutType()
        {
            Id = Guid.Parse("2c1e486d-ba56-4a7a-952e-e63095b78087"),
            Name = "Weight training"
        });
        context.WorkoutTypes.Add(new WorkoutType()
        {
            Id = Guid.Parse("60ef6e2c-6933-46b0-9754-5d6a70318791"),
            Name = "Cardio workout"
        });
        context.WorkoutTypes.Add(new WorkoutType()
        {
            Id = Guid.Parse("2cfe7dbc-685c-4d4a-8215-ac724ddf72ac"),
            Name = "Flexibility and stretching"
        });
        context.WorkoutTypes.Add(new WorkoutType()
        {
            Id = Guid.Parse("3b1cb2a0-9da4-44be-ab85-beea578639b1"),
            Name = "Functional training"
        });
        context.WorkoutTypes.Add(new WorkoutType()
        {
            Id = Guid.Parse("7d5056e1-5ebf-4f55-99f5-05249291ffb6"),
            Name = "Group fitness class"
        });
        context.WorkoutTypes.Add(new WorkoutType()
        {
            Id = Guid.Parse("891c3dc1-465b-49cc-844d-8024f22282ef"),
            Name = "Other"
        });

        context.WorkoutTypes.Add(new WorkoutType()
        {
            Id = Guid.Parse("8c090c9d-b0f4-4d83-a6c2-4bf94f4346bc"),
            Name = "All"
        });
    }

    private static void SeedAppDataSkillLevel(ApplicationDbContext context)
    {
        if (context.SkillLevels.Any()) return;

        context.SkillLevels.Add(new SkillLevel()
        {
            Id = Guid.Parse("c0473f8c-dc12-4456-a92e-0f85d91a526e"),
            Name = "Beginner"
        });

        context.SkillLevels.Add(new SkillLevel()
        {
            Id = Guid.Parse("97e18af8-edd3-4005-9658-0ffcda6f8660"),
            Name = "Intermediate"
        });

        context.SkillLevels.Add(new SkillLevel()
        {
            Id = Guid.Parse("3e58081e-8e4e-44b1-9e63-8b0ba7ed06b6"),
            Name = "Advanced"
        });

        context.SkillLevels.Add(new SkillLevel()
        {
            Id = Guid.Parse("18fe062c-e540-442c-86d4-2fa44d98dd7e"),
            Name = "Expert"
        });
    }
}