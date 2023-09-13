using AutoMapper;
using DAL.Base;
using Domain.App;
using Public.DTO.v1;

namespace Public.DTO.Mappers;

public class ReviewMapper : BaseMapper<BLL.DTO.Review, Public.DTO.v1.ReviewDTO>
{
    public ReviewMapper(IMapper mapper) : base(mapper)
    {
    }
}