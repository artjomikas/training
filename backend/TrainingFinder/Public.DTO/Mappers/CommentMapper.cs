using AutoMapper;
using DAL.Base;
using Domain.App;
using Public.DTO.v1;

namespace Public.DTO.Mappers;

public class CommentMapper: BaseMapper<BLL.DTO.Comment, Public.DTO.v1.CommentDTO>
{
    public CommentMapper(IMapper mapper) : base(mapper)
    {
    }
}