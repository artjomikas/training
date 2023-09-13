using Public.DTO.v1.Identity;

namespace Public.DTO.v1;

public class CommentDTO
{
    public Guid Id { get; set; }
    
    public string? Text { get; set; }
    
    public DateTime? CreatedAt { get; set; }

    public Guid AppUserId { get; set; }  
    public Guid WorkoutId { get; set; }  
    public UserDTO? AppUser { get; set; }
    // public string? AppUserFirstName { get; set; }
    // public string? AppUserLastName { get; set; }
    // public string? AppUserImage { get; set; }
    // public string? AppUserId { get; set; }

    public Guid? ParentCommentId { get; set; }
}