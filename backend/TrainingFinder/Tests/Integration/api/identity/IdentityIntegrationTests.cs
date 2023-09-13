using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Public.DTO.v1.Identity;
using Xunit.Abstractions;

namespace Tests.Integration.api.identity;

public class IdentityIntegrationTests : IClassFixture<CustomWebAppFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly CustomWebAppFactory<Program> _factory;
    private readonly ITestOutputHelper _testOutputHelper;

    private readonly JsonSerializerOptions camelCaseJsonSerializerOptions = new JsonSerializerOptions()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    public IdentityIntegrationTests(CustomWebAppFactory<Program> factory, ITestOutputHelper testOutputHelper)
    {
        _factory = factory;
        _testOutputHelper = testOutputHelper;
        _client = factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });
    }

    [Fact(DisplayName = "POST - register new user")]
    public async Task RegisterNewUserTest()
    {
        // Arrange
        const string URL = "/api/v1/identity/account/register";
        const string email = "register@test.ee";
        const string firstname = "TestFirst";
        const string lastname = "TestLast";
        const string password = "Foo.bar1";

        var registerData = new
        {
            Email = email,
            Password = password,
            Firstname = firstname,
            Lastname = lastname,
        };
        var data = JsonContent.Create(registerData);

        // Act
        var response = await _client.PostAsync(URL, data);

        // Assert
        var responseContent = await response.Content.ReadAsStringAsync();

        Assert.True(response.IsSuccessStatusCode);

        var jwtResponse = JsonSerializer.Deserialize<JWTResponse>(responseContent, camelCaseJsonSerializerOptions);


        Assert.NotNull(jwtResponse);
        Assert.NotNull(jwtResponse.RefreshToken);
        Assert.NotNull(jwtResponse.JWT);

        VerifyJwtContent(responseContent, email, firstname, lastname);
    }

    private void VerifyJwtContent(string jwt, string email, string firstname, string lastname
    )
    {
        var jwtResponse = JsonSerializer.Deserialize<JWTResponse>(jwt, camelCaseJsonSerializerOptions);

        Assert.NotNull(jwtResponse);
        Assert.NotNull(jwtResponse.RefreshToken);
        Assert.NotNull(jwtResponse.JWT);

        // verify the actual JWT
        var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(jwtResponse.JWT);
        Assert.Equal(email, jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value);
        Assert.Equal(firstname, jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName)?.Value);
        Assert.Equal(lastname, jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Surname)?.Value);
    }

    private async Task<string> RegisterNewUser(string email, string password, string firstname, string lastname
    )
    {
        var URL = $"/api/v1/identity/account/register";

        var registerData = new
        {
            Email = email,
            Password = password,
            Firstname = firstname,
            Lastname = lastname,
        };

        var data = JsonContent.Create(registerData);
        // Act
        var response = await _client.PostAsync(URL, data);

        var responseContent = await response.Content.ReadAsStringAsync();
        // Assert
        Assert.True(response.IsSuccessStatusCode);

        VerifyJwtContent(responseContent, email, firstname, lastname);

        return responseContent;
    }

    [Fact(DisplayName = "POST - login user")]
    public async Task LoginUserTest()
    {
        const string email = "login@test.ee";
        const string firstname = "TestFirst";
        const string lastname = "TestLast";
        const string password = "Foo.bar1";


        // Arrange
        await RegisterNewUser(email, password, firstname, lastname);


        var URL = "/api/v1/identity/account/login";

        var loginData = new
        {
            Email = email,
            Password = password,
        };

        var data = JsonContent.Create(loginData);

        // Act
        var response = await _client.PostAsync(URL, data);

        var responseContent = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.True(response.IsSuccessStatusCode);
        VerifyJwtContent(responseContent, email, firstname, lastname);
    }

    [Fact(DisplayName = "POST - JWT expired")]
    public async Task JWTExpired()
    {
        const string email = "expired@test.ee";
        const string firstname = "TestFirst";
        const string lastname = "TestLast";
        const string password = "Foo.bar1";


        const string URL = "/api/v1/trainingplans";

        // Arrange
        var jwt = await RegisterNewUser(email, password, firstname, lastname);
        var jwtResponse = JsonSerializer.Deserialize<JWTResponse>(jwt, camelCaseJsonSerializerOptions);


        var request = new HttpRequestMessage(HttpMethod.Get, URL);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", jwtResponse!.JWT);

        // Act
        var response = await _client.SendAsync(request);

        // Assert
        Assert.True(response.IsSuccessStatusCode);


        var request2 = new HttpRequestMessage(HttpMethod.Get, URL);
        request2.Headers.Authorization = new AuthenticationHeaderValue("Bearer", jwtResponse!.JWT);

        // Act
        var response2 = await _client.SendAsync(request2);

        // Assert
        Assert.False(response2.IsSuccessStatusCode);
    }

    [Fact(DisplayName = "POST - JWT renewal")]
    public async Task JWTRenewal()
    {
        const string email = "renewal@test.ee";
        const string firstname = "TestFirst";
        const string lastname = "TestLast";
        const string password = "Foo.bar1";
        const int expiresInSeconds = 3;

        const string URL = "/api/v1/trainingplans";

        // Arrange
        var jwt = await RegisterNewUser(email, password, firstname, lastname);
        var jwtResponse = JsonSerializer.Deserialize<JWTResponse>(jwt, camelCaseJsonSerializerOptions);

        // let the jwt expire
        await Task.Delay((expiresInSeconds + 2) * 1000);

        var request = new HttpRequestMessage(HttpMethod.Get, URL);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", jwtResponse!.JWT);

        // Act
        var response = await _client.SendAsync(request);

        // Assert
        Assert.False(response.IsSuccessStatusCode);

        // Arrange
        var REFRESH_URL = $"/api/v1/identity/account/refreshtoken?expiresInSeconds={expiresInSeconds}";
        var refreshData = new
        {
            JWT = jwtResponse.JWT,
            RefreshToken = jwtResponse.RefreshToken,
        };

        var data = JsonContent.Create(refreshData);

        var response2 = await _client.PostAsync(REFRESH_URL, data);
        var responseContent2 = await response2.Content.ReadAsStringAsync();

        Assert.True(response2.IsSuccessStatusCode);

        jwtResponse = JsonSerializer.Deserialize<JWTResponse>(responseContent2, camelCaseJsonSerializerOptions);

        var request3 = new HttpRequestMessage(HttpMethod.Get, URL);
        request3.Headers.Authorization = new AuthenticationHeaderValue("Bearer", jwtResponse!.JWT);

        // Act
        var response3 = await _client.SendAsync(request3);
        // Assert
        Assert.True(response3.IsSuccessStatusCode);
    }
}