using Domain.App;
using Public.DTO.v1.Identity;

namespace Public.DTO.v1;

public class WorkoutDTO
{
    public Guid Id { get; set; } 
    
    public string? Name { get; set; } 
    public int Price { get; set; }
    public string? Description { get; set; } 
    public string? Image { get; set; } 
    
    public Guid AppUserId { get; set; }  
    public UserDTO? AppUser { get; set; }
    
    public int CurrentParticipants { get; set; } 
    public int MaxParticipants { get; set; } 
    
    public DateTime StartDate { get; set; } 
    public DateTime EndDate { get; set; } 
    
    public Guid WorkoutTypeId { get; set; }
    public WorkoutTypeDTO? WorkoutType { get; set; }
    
    public Guid IntensityId { get; set; } 
    public IntensityDTO? Intensity { get; set; }
    
    public Guid SkillLevelId { get; set; }
    public SkillLevelDTO? SkillLevel { get; set; }
  
    public Guid LocationId { get; set; }

    public LocationDTO? Location { get; set; }
    
    public IReadOnlyList<WorkoutUsersDTO> WorkoutUsers = default!;
    
    public IReadOnlyList<CommentDTO> Comments = default!;

}