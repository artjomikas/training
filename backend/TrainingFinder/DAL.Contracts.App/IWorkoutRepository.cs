using DAL.Contracts.Base;
using Domain.App;
using Domain.Contracts.Base;

namespace DAL.Contracts.App;

public interface IWorkoutRepository : IBaseRepository<Workout>, IWorkoutRepositoryCustom<Workout>
{

}

public interface IWorkoutRepositoryCustom<TEntity>
{
    Task<IEnumerable<TEntity>> AllAsyncByDate(DateTime date, Guid workoutTypeId);
    Task<bool> IsOwnedByUserAsync(Guid id, Guid userId);
}