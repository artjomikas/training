using Domain.Base;

namespace BLL.DTO;

public class Comment : DomainEntityId

{
    public string? Text { get; set; }

    public DateTime? CreatedAt { get; set; }

    public Guid? AppUserId { get; set; }

    public Domain.App.Identity.AppUser? AppUser { get; set; }

    public Guid? WorkoutId { get; set; }

    public Domain.App.Workout? Workout { get; set; }

    public Guid? ParentCommentId { get; set; }
}