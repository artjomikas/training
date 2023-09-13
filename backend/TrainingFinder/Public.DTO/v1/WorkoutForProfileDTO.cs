namespace Public.DTO.v1;

public class WorkoutForProfileDTO
{
    public Guid Id { get; set; } = default!;

    public string Name { get; set; } = default!;
    public int Price { get; set; } = default!;
    public string Image { get; set; } = default!;

    public int CurrentParticipants { get; set; } = default!;
    public int MaxParticipants { get; set; } = default!;
    
    public DateTime StartDate { get; set; } = default!;
    public DateTime EndDate { get; set; } = default!;

    public Guid LocationId { get; set; }

    public LocationDTO? Location { get; set; }
}