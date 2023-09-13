using AutoMapper;
using DAL.Base;

namespace BLL.App.Mappers;

public class CommentsMapper : BaseMapper<BLL.DTO.Comment, Domain.App.Comment>
{
    public CommentsMapper(IMapper mapper) : base(mapper)
    {
    }
}