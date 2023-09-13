using AutoMapper;
using DAL.EF.App;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebApp.ApiControllers;
using Xunit.Abstractions;
using BLL.App;
using DAL.EF.App.Seeding;
using BLL.App.Mappers;
using Moq;
using BLL.Contracts.App;
using DAL.EF.App.Seeding;
using Domain.App;
using Domain.App.Identity;
using Public.DTO.v1;
using Public.DTO.v1.Identity;

namespace Tests.Unit;

public class WorkoutUnitTests
{
    public class ApiOwnersUnitTests
    {
        private readonly ITestOutputHelper _testOutputHelper;
        private readonly IMapper _BLLMapper;
        private readonly WorkoutService _workoutService;
        private readonly ApplicationDbContext _ctx;


        public ApiOwnersUnitTests(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;

            // set up mock database - inMemory
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            // use random guid as db instance id
            optionsBuilder.UseInMemoryDatabase(Guid.NewGuid().ToString());

            _ctx = new ApplicationDbContext(optionsBuilder.Options);

            // reset db
            _ctx.Database.EnsureDeleted();
            _ctx.Database.EnsureCreated();


            AppDataInit.SeedAppData(_ctx);


            _workoutService = new WorkoutService(new AppUOW(_ctx), new BLL.App.Mappers.WorkoutMapper(_BLLMapper));
        }


        [Fact(DisplayName = "POST - add workout ctx")]
        public async Task testAddWorkoutCtx()
        {
            // Arrange

            // var data = new WorkoutDTO()
            // {
            //     Name = "Streching",
            //     Price = 2,
            //     WorkoutType = new WorkoutTypeDTO()
            //     {
            //         Name = "Cardio workout"
            //     },
            //     Intensity = new IntensityDTO()
            //     {
            //         Name = "Moderate"
            //     },
            //     SkillLevel = new SkillLevelDTO()
            //     {
            //         Name = "Beginner"
            //     },
            //     MaxParticipants = 4,
            //     Description = "d",
            //     Image = "d",
            //     Location = new LocationDTO()
            //     {
            //         Name = "Õismäe Tee 23",
            //         Latitude = 59.411606,
            //         Longitude = 24.652101
            //     },
            //     StartDate = new DateTime(),
            //     EndDate = new DateTime(),
            //
            //     AppUserId = Guid.Parse("378e2b3c-829c-48c6-83dc-fa2aab6b0709")
            // };

            var domainWorkout = new Workout()
            {
                Id = Guid.NewGuid(),
                AppUserId = Guid.Parse("378e2b3c-829c-48c6-83dc-fa2aab6b0709"),
                Name = "Streching Updated!",
                Price = 2,
                WorkoutTypeId = Guid.Parse("2c1e486d-ba56-4a7a-952e-e63095b78087"),
                IntensityId = Guid.Parse("49d8b632-c36e-449e-a645-bcc4329ebe97"),
                SkillLevelId = Guid.Parse("3e58081e-8e4e-44b1-9e63-8b0ba7ed06b6"),
                MaxParticipants = 4,
                Description = "d",
                Image = "d",
                Location = new Location()
                {
                    Name = "Õismäe Tee 23",
                    Latitude = 59.411606,
                    Longitude = 24.652101
                },
                StartDate = new DateTime(),
                EndDate = new DateTime(),
            };

            await _ctx.Workouts.AddAsync(domainWorkout);

            await _ctx.SaveChangesAsync();

            var workouts = _ctx.Workouts.ToListAsync();

            Assert.NotNull(workouts);
            Assert.Equal(1, workouts.Result.Count);
        }


        [Fact(DisplayName = "POST - add workout service")]
        public async Task testAddWorkoutService()
        {
            var bllWorkout = new BLL.DTO.Workout()
            {
                Id = Guid.NewGuid(),
                AppUserId = Guid.Parse("378e2b3c-829c-48c6-83dc-fa2aab6b0709"),
                Name = "Streching Updated!",
                Price = 2,
                WorkoutTypeId = Guid.Parse("2c1e486d-ba56-4a7a-952e-e63095b78087"),
                IntensityId = Guid.Parse("49d8b632-c36e-449e-a645-bcc4329ebe97"),
                SkillLevelId = Guid.Parse("3e58081e-8e4e-44b1-9e63-8b0ba7ed06b6"),
                MaxParticipants = 4,
                Description = "d",
                Image = "d",
                Location = new Location()
                {
                    Name = "Õismäe Tee 23",
                    Latitude = 59.411606,
                    Longitude = 24.652101
                },
                StartDate = new DateTime(),
                EndDate = new DateTime(),
            };


            _ctx.ChangeTracker.Clear();
            var trainingCreate = _workoutService.Add(bllWorkout);
            // await _ctx.Workouts.AddAsync(domainWorkout);

            await _ctx.SaveChangesAsync();

            var workouts = await _ctx.Workouts.ToListAsync();

            Assert.NotNull(workouts);
        }


        [Fact(DisplayName = "DELETE - delete workout ctx")]
        public async Task testDeleteWorkout()
        {
            var idWorkout = Guid.NewGuid();
            var domainWorkout = new Workout()
            {
                Id = idWorkout,
                AppUserId = Guid.Parse("378e2b3c-829c-48c6-83dc-fa2aab6b0709"),
                Name = "Streching Updated!",
                Price = 2,
                WorkoutTypeId = Guid.Parse("2c1e486d-ba56-4a7a-952e-e63095b78087"),
                IntensityId = Guid.Parse("49d8b632-c36e-449e-a645-bcc4329ebe97"),
                SkillLevelId = Guid.Parse("3e58081e-8e4e-44b1-9e63-8b0ba7ed06b6"),
                MaxParticipants = 4,
                Description = "d",
                Image = "d",
                Location = new Location()
                {
                    Name = "Õismäe Tee 23",
                    Latitude = 59.411606,
                    Longitude = 24.652101
                },
                StartDate = new DateTime(),
                EndDate = new DateTime(),
            };

            await _ctx.Workouts.AddAsync(domainWorkout);

            await _ctx.SaveChangesAsync();

            var workouts = _ctx.Workouts.ToListAsync();

            Assert.NotNull(workouts);
            Assert.Equal(1, workouts.Result.Count);

            _ctx.Workouts.Remove(domainWorkout);

            await _ctx.SaveChangesAsync();

            var workoutsDel = _ctx.Workouts.ToListAsync();

            Assert.Equal(0, workoutsDel.Result.Count);
        }

        [Fact(DisplayName = "DELETE - delete workout service")]
        public async Task testDeleteWorkoutService()
        {
            var idWorkout = Guid.NewGuid();
            var domainWorkout = new Workout()
            {
                Id = idWorkout,
                AppUserId = Guid.Parse("378e2b3c-829c-48c6-83dc-fa2aab6b0709"),
                Name = "Streching Updated!",
                Price = 2,
                WorkoutTypeId = Guid.Parse("2c1e486d-ba56-4a7a-952e-e63095b78087"),
                IntensityId = Guid.Parse("49d8b632-c36e-449e-a645-bcc4329ebe97"),
                SkillLevelId = Guid.Parse("3e58081e-8e4e-44b1-9e63-8b0ba7ed06b6"),
                MaxParticipants = 4,
                Description = "d",
                Image = "d",
                Location = new Location()
                {
                    Name = "Õismäe Tee 23",
                    Latitude = 59.411606,
                    Longitude = 24.652101
                },
                StartDate = new DateTime(),
                EndDate = new DateTime(),
            };

            await _ctx.Workouts.AddAsync(domainWorkout);

            await _ctx.SaveChangesAsync();

            var workouts = _ctx.Workouts.ToListAsync();

            Assert.NotNull(workouts);
            Assert.Equal(1, workouts.Result.Count);


            _ctx.ChangeTracker.Clear();
            var workoutDelete = await _workoutService.RemoveAsyncById(idWorkout);

            await _ctx.SaveChangesAsync();

            var workoutsDel = await _ctx.Workouts.ToListAsync();

            Assert.NotNull(workouts);
            Assert.Equal(0, workoutsDel.Count);

        }
    }
}