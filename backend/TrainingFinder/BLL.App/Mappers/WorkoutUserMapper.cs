using AutoMapper;
using DAL.Base;

namespace BLL.App.Mappers;

public class WorkoutUserMapper: BaseMapper<BLL.DTO.WorkoutUser, Domain.App.WorkoutUser>
{
    public WorkoutUserMapper(IMapper mapper) : base(mapper)
    {
    }
}