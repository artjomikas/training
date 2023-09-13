namespace Public.DTO.v1;

public class WorkoutUsersDTO
{
    public Guid Id { get; set; }
    
    public Guid AppUserId { get; set; } = default!;
    
    public string? AppUserImage { get; set; } = default!;
    public string? AppUserFirstName { get; set; } = default!;
    public string? AppUserLastName { get; set; } = default!;
}