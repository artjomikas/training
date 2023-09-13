using BLL.Base;
using BLL.Contracts.App;
using BLL.DTO;
using Contracts.Base;
using DAL.Contracts.App;

namespace BLL.App;

public class CommentService : BaseEntityService<BLL.DTO.Comment, Domain.App.Comment, ICommentRepository>, ICommentService
{
    protected IAppUOW Uow;

    public CommentService(IAppUOW uow, IMapper<Comment, Domain.App.Comment> mapper) : base(uow.CommentRepository, mapper)
    {
        Uow = uow;
    }

    public async Task<IEnumerable<Comment>> GetCommentsByWorkoutId(Guid id)
    {
        return (await Uow.CommentRepository.GetCommentsByWorkoutId(id)).Select(e => Mapper.Map(e))!;
    }

    public async Task<bool> IsOwnedByUserAsync(Guid id, Guid userId)
    {
        return await Uow.CommentRepository.IsOwnedByUserAsync(id, userId);
    }
}