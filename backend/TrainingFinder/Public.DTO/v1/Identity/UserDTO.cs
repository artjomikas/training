namespace Public.DTO.v1.Identity;

public class UserDTO
{
    public Guid Id { get; set; } = default!;

    public string? FirstName { get; set; } = default!;

    public string? LastName { get; set; } = default!;

    public string? Image { get; set; } = default!;

    public string? Bio { get; set; } = default!;

    public DateTime RegisteredAt { get; set; } = default!;
}