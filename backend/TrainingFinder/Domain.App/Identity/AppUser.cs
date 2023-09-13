using System.ComponentModel.DataAnnotations;
using Domain.Contracts.Base;
using Microsoft.AspNetCore.Identity;

namespace Domain.App.Identity;

public class AppUser : IdentityUser<Guid>, IDomainEntityId
{
    [MaxLength(128)] public string? FirstName { get; set; } = default!;

    [MaxLength(128)] public string? LastName { get; set; } = default!;

    public string? Image { get; set; }
    
    public string? Bio { get; set; }
    
    public DateTime RegisteredAt { get; set; }
    
    public ICollection<Review>? Reviews { get; set; }

    public ICollection<Comment>? Comments { get; set; }

    public ICollection<Workout>? Workouts { get; set; }

    public ICollection<WorkoutUser>? WorkoutUsers { get; set; }

    public ICollection<AppRefreshToken>? AppRefreshTokens { get; set; }
}