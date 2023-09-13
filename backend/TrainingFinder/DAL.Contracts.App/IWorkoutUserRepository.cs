using System.Security.Policy;
using DAL.Contracts.Base;
using Domain.App;

namespace DAL.Contracts.App;

public interface IWorkoutUserRepository : IBaseRepository<WorkoutUser>, IWorkoutUserRepositoryCustom<WorkoutUser>
{

}

public interface IWorkoutUserRepositoryCustom<TEntity>
{
    public Task<IEnumerable<TEntity>> GetScheduleForUser(TEntity schedule) ;
    public Task<IEnumerable<TEntity>> GetHistoryForUser(TEntity schedule) ;
}