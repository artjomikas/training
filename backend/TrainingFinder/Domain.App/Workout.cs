using Domain.App.Identity;
using Domain.Base;

namespace Domain.App;

public class Workout : DomainEntityId
{
    public Guid WorkoutTypeId { get; set; }

    public WorkoutType? WorkoutType { get; set; }


    public Guid SkillLevelId { get; set; }

    public SkillLevel? SkillLevel { get; set; }


    public Guid LocationId { get; set; }

    public Location? Location { get; set; }


    public Guid IntensityId { get; set; }

    public Intensity? Intensity { get; set; }


    public Guid AppUserId { get; set; }
    public AppUser? AppUser { get; set; }
    
    public string? Name { get; set; }

    public int Price { get; set; }

    public int? CurrentParticipants { get; set; }
    public int MaxParticipants { get; set; }
    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }

    public ICollection<WorkoutUser>? WorkoutUsers { get; set; }
    
    public ICollection<Comment>? Comments { get; set; }
}