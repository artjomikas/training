namespace Public.DTO.v1;

public class AppUserDTO
{
    public Guid Id { get; set; } = default!;

    public string? FirstName { get; set; } 

    public string? LastName { get; set; } 

    public string? Image { get; set; } 

    public string? Bio { get; set; } = default!;

    public DateTime RegisteredAt { get; set; } = default!;
    
    public int? CommentsNumber { get; set; }
    public int? WorkoutParticipatedNumber { get; set; }
    public int? PostedWorkouts { get; set; }
    
    public ICollection<WorkoutForProfileDTO>? Workouts { get; set; }
    
    public ICollection<ReviewDTO>? Reviews { get; set; }
}