using Domain.Base;

namespace BLL.DTO;

public class WorkoutUser : DomainEntityId
{
    public Guid AppUserId { get; set; }
    public Domain.App.Identity.AppUser? AppUser { get; set; }
    
    public Guid WorkoutId { get; set; }
    public Domain.App.Workout? Workout {get; set; }
}