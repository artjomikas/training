using Domain.App;

namespace Public.DTO.v1;

public class ScheduleDTO
{
    public Guid Id { get; set; } 
    public Guid WorkoutId { get; set; }
    public Guid AppUserId { get; set; }  
    
    public string? WorkoutName { get; set; } 
    public string? WorkoutDescription { get; set; }

    public IReadOnlyList<WorkoutUsersDTO>? WorkoutUsers;

    
    public DateTime WorkoutStartDate { get; set; }
    public DateTime WorkoutEndDate { get; set; } 
    
    public string? WorkoutWorkoutTypeName { get; set; } 
    public string? WorkoutSkillLevelName { get; set; } 
    public string? WorkoutLocationName { get; set; }
}