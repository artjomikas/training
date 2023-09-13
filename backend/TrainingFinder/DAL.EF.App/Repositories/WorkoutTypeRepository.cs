using DAL.Contracts.App;
using DAL.EF.Base;
using Domain.App;

namespace DAL.EF.App.Repositories;

public class WorkoutTypeRepository : EFBaseRepository<WorkoutType, ApplicationDbContext>, IWorkoutTypeRepository
{
    public WorkoutTypeRepository(ApplicationDbContext dataContext) : base(dataContext)
    {
    }
}