using AutoMapper;
using DAL.Base;

namespace BLL.App.Mappers;

public class ReviewsMapper : BaseMapper<BLL.DTO.Review, Domain.App.Review>
{
    public ReviewsMapper(IMapper mapper) : base(mapper)
    {
    }
}