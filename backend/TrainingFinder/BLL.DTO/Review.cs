using Domain.App.Identity;
using Domain.Base;

namespace BLL.DTO;

public class Review : DomainEntityId
{
    public string Text { get; set; } = default!;

    public Guid AppUserId { get; set; }
    public AppUser? AppUser { get; set; }
    
        
    public Guid CreatedByUserId { get; set; }
    public AppUser? CreatedByUser { get; set; }

    public DateTime? CreatedAt { get; set; }
}