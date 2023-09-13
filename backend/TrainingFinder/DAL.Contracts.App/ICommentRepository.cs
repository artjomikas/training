using DAL.Contracts.Base;
using Domain.App;

namespace DAL.Contracts.App;

public interface ICommentRepository: IBaseRepository<Comment>, ICommentRepositoryCustom<Comment>
{
    
}

public interface ICommentRepositoryCustom<TEntity>
{
    Task<IEnumerable<TEntity>> GetCommentsByWorkoutId(Guid id);
    Task<bool> IsOwnedByUserAsync(Guid id, Guid userId);
}