using Domain.Base;

namespace Domain.App;

public class WorkoutType: DomainEntityId
{
    public string? Name { get; set; }
    
    public ICollection<Workout>? Workouts { get; set; }

}