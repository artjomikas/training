using DAL.Contracts.App;
using DAL.Contracts.Base;

namespace BLL.Contracts.App;

public interface ICommentService: IBaseRepository<BLL.DTO.Comment>, ICommentRepositoryCustom<BLL.DTO.Comment>
{
    
}

