using DAL.Contracts.App;
using DAL.EF.Base;
using Domain.App;

namespace DAL.EF.App.Repositories;

public class LocationRepository : EFBaseRepository<Location, ApplicationDbContext>, ILocationRepository
{
    public LocationRepository(ApplicationDbContext dataContext) : base(dataContext)
    {
    }
}