using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Runtime.InteropServices.JavaScript;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using Domain.App;
using Humanizer;
using Microsoft.AspNetCore.Mvc.Testing;
using NuGet.Protocol;
using Public.DTO.v1;
using Public.DTO.v1.Identity;
using Tests.Helpers;
using Xunit.Abstractions;

namespace Tests.Integration.api.identity;

public class WorkoutIntegrationTests : IClassFixture<CustomWebAppFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly CustomWebAppFactory<Program> _factory;
    private readonly ITestOutputHelper _testOutputHelper;
    private string _jwt = "";

    private readonly JsonSerializerOptions camelCaseJsonSerializerOptions = new JsonSerializerOptions()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    public WorkoutIntegrationTests(CustomWebAppFactory<Program> factory, ITestOutputHelper testOutputHelper)
    {
        _factory = factory;
        _testOutputHelper = testOutputHelper;
        _client = factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = true
        });
    }

    public async Task GetJWT()
    {
        var URL = "/api/v1/identity/account/login";

        const string email = "admin@app.com";
        const string password = "Qwerty.1";

        var loginData = new
        {
            Email = email,
            Password = password,
        };


        var data = JsonContent.Create(loginData);

        // LOGIN TO ALREADY REGISTER USER
        var response = await _client.PostAsync(URL, data);

        var responseContent = await response.Content.ReadAsStringAsync();

        Assert.True(response.IsSuccessStatusCode);

        var jwtResponse = JsonSerializer.Deserialize<JWTResponse>(responseContent, camelCaseJsonSerializerOptions);

        Assert.NotNull(jwtResponse);
        Assert.NotNull(jwtResponse.RefreshToken);
        Assert.NotNull(jwtResponse.JWT);

        // RETURN JWT

        _jwt = jwtResponse.JWT;
    }


    public async Task AddNewWorkout(Guid id)
    {
        // GET JWT
        await GetJWT();

        const string URL = "/api/v1/Workouts";

        var data = new WorkoutDTO
        {
            Id = id,
            Name = "Streching",
            Price = 2,
            WorkoutTypeId = Guid.Parse("2c1e486d-ba56-4a7a-952e-e63095b78087"),
            IntensityId = Guid.Parse("49d8b632-c36e-449e-a645-bcc4329ebe97"),
            SkillLevelId = Guid.Parse("3e58081e-8e4e-44b1-9e63-8b0ba7ed06b6"),
            MaxParticipants = 4,
            Description = "d",
            Image = "d",
            Location = new LocationDTO()
            {
                Name = "Õismäe Tee 23",
                Latitude = 59.411606,
                Longitude = 24.652101
            },
            StartDate = new DateTime(),
            EndDate = new DateTime(),
            AppUserId = Guid.Parse("378e2b3c-829c-48c6-83dc-fa2aab6b0709")
        };

        var dataFormatted = JsonContent.Create(data);

        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _jwt);

        // ADD NEW WORKOUT
        var response = await _client.PostAsync(URL, dataFormatted);

        var responseContent = await response.Content.ReadAsStringAsync();

        _testOutputHelper.WriteLine(responseContent);
        Assert.Equal(true, response.IsSuccessStatusCode);

        var workout = JsonSerializer.Deserialize<WorkoutDTO>(responseContent, camelCaseJsonSerializerOptions);

        Assert.NotNull(workout);
        Assert.NotNull(workout.Id.ToString());
        Assert.NotNull(workout.Name);
    }

    public async Task UpdateAlreadyAddedWorkout(Guid id)
    {
        var URL = "/api/v1/Workouts/" + id.ToString() ;

        var data = new WorkoutDTO
        {
            Id = id,
            Name = "Streching Updated!",
            Price = 2,
            WorkoutTypeId = Guid.Parse("2c1e486d-ba56-4a7a-952e-e63095b78087"),
            IntensityId = Guid.Parse("49d8b632-c36e-449e-a645-bcc4329ebe97"),
            SkillLevelId = Guid.Parse("3e58081e-8e4e-44b1-9e63-8b0ba7ed06b6"),
            MaxParticipants = 4,
            Description = "d",
            Image = "d",
            Location = new LocationDTO()
            {
                Name = "Õismäe Tee 23",
                Latitude = 59.411606,
                Longitude = 24.652101
            },
            StartDate = new DateTime(),
            EndDate = new DateTime(),
        };

        var dataFormatted = JsonContent.Create(data);

        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _jwt);

        // ADD NEW WORKOUT
        var response = await _client.PutAsync(URL, dataFormatted);
        
        Assert.Equal(true, response.IsSuccessStatusCode);
    }

    public async Task<WorkoutDTO> GetWorkoutById(Guid id)
    {
        var URL = "/api/v1/Workouts/" + id;

        var response = await _client.GetAsync(URL);

        Assert.True(response.IsSuccessStatusCode);

        var workout = await response.Content.ReadAsStringAsync();
        _testOutputHelper.WriteLine(workout);

        var workoutsDeserialized =
            JsonSerializer.Deserialize<WorkoutDTO>(workout, camelCaseJsonSerializerOptions);
        Assert.NotNull(workoutsDeserialized);
        return workoutsDeserialized;
    }

    public async Task<List<WorkoutDTO>> GetWorkoutNumber()
    {
        var URL = "/api/v1/Workouts";

        var response = await _client.GetAsync(URL);

        Assert.True(response.IsSuccessStatusCode);

        var workouts = await response.Content.ReadAsStringAsync();
        // _testOutputHelper.WriteLine(workouts);

        var workoutsList =
            JsonSerializer.Deserialize<List<WorkoutDTO>>(workouts, camelCaseJsonSerializerOptions);
        Assert.NotNull(workoutsList);
        return workoutsList;
    }

    public async Task DeleteWorkout(Guid id)
    {
        var URL = "/api/v1/Workouts/" + id;

        var response = await _client.DeleteAsync(URL);

        Assert.True(response.IsSuccessStatusCode);
    }
    
    public async Task DeleteWorkoutBadRequest(Guid id)
    {
        var URL = "/api/v1/Workouts/" + id;

        var response = await _client.DeleteAsync(URL);

        Assert.False(response.IsSuccessStatusCode);
    }



    [Fact(DisplayName = "POST/GET = Add workout")]
    public async Task AddWorkoutTest()
    {
        var id = Guid.NewGuid();
        
        var initialWorkoutNumber = await GetWorkoutNumber();

        await AddNewWorkout(id);

        var afterAddingWorkoutNumber = await GetWorkoutNumber();

        Assert.NotNull(afterAddingWorkoutNumber);
        Assert.NotEqual(initialWorkoutNumber, afterAddingWorkoutNumber);
        Assert.NotEqual(initialWorkoutNumber.Count.ToString(), afterAddingWorkoutNumber.Count.ToString());
    }
    
    [Fact(DisplayName = "PUT/GET - Update workout")]
    public async Task UpdateWorkoutTest()
    {
        var id = Guid.NewGuid();
        
        await AddNewWorkout(id);

        var initialWorkout = await GetWorkoutById(id);

        await UpdateAlreadyAddedWorkout(id);

        var updatedWorkout = await GetWorkoutById(id);

        Assert.NotNull(initialWorkout);
        Assert.NotNull(updatedWorkout);
        Assert.NotNull(initialWorkout.Name);
        Assert.NotNull(updatedWorkout.Name);
        Assert.NotEqual(initialWorkout.Name, updatedWorkout.Name);
    }

    [Fact(DisplayName = "DELETE/POST - Delete Workout")]
    public async Task DeleteWorkoutTest()
    {
        var id = Guid.NewGuid();
        await AddNewWorkout(id);

        var initialWorkoutNumber = await GetWorkoutNumber();

        await DeleteWorkout(id);

        var afterAddingWorkoutNumber = await GetWorkoutNumber();

        Assert.NotNull(afterAddingWorkoutNumber);
        Assert.NotEqual(initialWorkoutNumber.Count.ToString(), afterAddingWorkoutNumber.Count.ToString());
    }
    
    
    [Fact(DisplayName = "DELETE/POST - Delete Workout with no jwt")]
    public async Task DeleteWorkoutHackingTest()
    {
        var id = Guid.NewGuid();
        await AddNewWorkout(id);

        var initialWorkoutNumber = await GetWorkoutNumber();

        _client.DefaultRequestHeaders.Remove("Authorization");
        
        await DeleteWorkoutBadRequest(id);

        var afterAddingWorkoutNumber = await GetWorkoutNumber();

        Assert.NotNull(afterAddingWorkoutNumber);
        Assert.Equal(initialWorkoutNumber.Count.ToString(), afterAddingWorkoutNumber.Count.ToString());
    }
}

