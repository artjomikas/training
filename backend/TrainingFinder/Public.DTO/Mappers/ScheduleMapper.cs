using AutoMapper;
using DAL.Base;
using Domain.App;
using Public.DTO.v1;

namespace Public.DTO.Mappers;

public class ScheduleMapper: BaseMapper<BLL.DTO.WorkoutUser, Public.DTO.v1.ScheduleDTO>
{
    public ScheduleMapper(IMapper mapper) : base(mapper)
    {
    }
}