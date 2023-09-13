using Domain.Base;

namespace Domain.App;

public class Location: DomainEntityId
{
    public string? Name { get; set; }
    
    public double Latitude { get; set; }
    
    public double Longitude { get; set; }
}