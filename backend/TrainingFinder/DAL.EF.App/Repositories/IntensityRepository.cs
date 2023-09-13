using DAL.Contracts.App;
using DAL.EF.Base;
using Domain.App;

namespace DAL.EF.App.Repositories;

public class IntensityRepository : EFBaseRepository<Intensity, ApplicationDbContext>, IIntensityRepository
{
    public IntensityRepository(ApplicationDbContext dataContext) : base(dataContext)
    {
    }
}