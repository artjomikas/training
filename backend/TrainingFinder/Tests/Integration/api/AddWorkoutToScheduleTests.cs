using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Domain.App;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using NuGet.Protocol;
using Public.DTO.v1;
using Public.DTO.v1.Identity;
using Tests.Helpers;
using Xunit.Abstractions;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Tests.Integration.api.identity;

public class AddWorkoutToScheduleTests : IClassFixture<CustomWebAppFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly CustomWebAppFactory<Program> _factory;
    private readonly ITestOutputHelper _testOutputHelper;
    private string _jwt = "";


    private readonly JsonSerializerOptions camelCaseJsonSerializerOptions = new JsonSerializerOptions()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    public AddWorkoutToScheduleTests(CustomWebAppFactory<Program> factory, ITestOutputHelper testOutputHelper)
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

    internal async Task AddNewWorkout(Guid id)
    {
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

        Assert.Equal(true, response.IsSuccessStatusCode);

        var workout = JsonSerializer.Deserialize<WorkoutDTO>(responseContent, camelCaseJsonSerializerOptions);

        Assert.NotNull(workout);
        Assert.NotNull(workout.Id.ToString());
        Assert.NotNull(workout.Name);
    }

    internal async Task<List<ScheduleDTO>> GetSchedule()
    {
        const string URL = "/api/v1/WorkoutUsers/";

        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _jwt);

        // GET SCHEDULE FOR USER
        var response = await _client.GetAsync(URL);

        Assert.Equal(true, response.IsSuccessStatusCode);

        var schedule = await response.Content.ReadAsStringAsync();

        _testOutputHelper.WriteLine(schedule);

        var scheduleList =
            JsonSerializer.Deserialize<List<ScheduleDTO>>(schedule, camelCaseJsonSerializerOptions);


        Assert.NotNull(scheduleList);
        return scheduleList;
    }


    public async Task RemoveWorkoutFromShedule(Guid id)
    {
        var URL = "/api/v1/WorkoutUsers/" + id;

        var response = await _client.DeleteAsync(URL);

        Assert.True(response.IsSuccessStatusCode);
    }

    public async Task AddWorkoutToShedule(Guid id)
    {
        const string URL = "/api/v1/WorkoutUsers/join";

        var data = new 
        {
            workoutId = id.ToString(),
        };

        var dataFormatted = JsonContent.Create(data);

        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _jwt);

        // ADD WORKOUT TO SCHEDULE
        var response = await _client.PostAsync(URL, dataFormatted);

        var responseContent = await response.Content.ReadAsStringAsync();

        _testOutputHelper.WriteLine(responseContent);

        Assert.Equal(true, response.IsSuccessStatusCode);
        
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


    [Fact(DisplayName = "POST - Add workout to schedule")]
    public async Task AddWorkoutToUserSheduleTest()
    {
        await GetJWT();
        var id = Guid.NewGuid();
        await AddNewWorkout(id);
        await AddWorkoutToShedule(id);
    }

    // [Fact(DisplayName = "DELETE - Remove workout from schedule")]
    // public async Task RemoveWorkoutFromSheduleTest()
    // {
    //     await GetJWT();
    //     var id = Guid.NewGuid();
    //     await AddNewWorkout(id);
    //     
    //     var initialWorkout = await GetWorkoutNumber();
    //
    //     _testOutputHelper.WriteLine(initialWorkout.Count.ToString());
    //     
    //     await AddWorkoutToShedule(id);
    //     await RemoveWorkoutFromShedule(id);
    // }
}