using Domain.App.Identity;
using Domain.Base;

namespace Domain.App;

public class Comment : DomainEntityId
{
    public string? Text { get; set; }
    
    public DateTime? CreatedAt { get; set; }
    
    public Guid AppUserId { get; set; }
    public AppUser? AppUser { get; set; }

    public Guid WorkoutId { get; set; }
    
    public Workout? Workout {get; set; }

    public Guid? ParentCommentId { get; set; }
}