using Public.DTO.v1.Identity;

namespace Public.DTO.v1;

public class ReviewDTO
{
    public string Text { get; set; } = default!;

    public Guid AppUserId { get; set; }

    public Guid CreatedByUserId { get; set; }
    
    public UserDTO? CreatedByUser { get; set; }
    
    public DateTime? CreatedAt { get; set; }
}