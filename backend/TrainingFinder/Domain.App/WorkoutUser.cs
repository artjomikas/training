using Domain.App.Identity;
using Domain.Base;

namespace Domain.App;

public class WorkoutUser: DomainEntityId
{

    public Guid AppUserId { get; set; }
    public AppUser? AppUser { get; set; }
    
    public Guid WorkoutId { get; set; }
    
    public Workout? Workout {get; set; }
    
}