using AutoMapper;
using DAL.Base;
using Domain.App;
using Public.DTO.v1;

namespace Public.DTO.Mappers;

public class WorkoutMapper: BaseMapper<BLL.DTO.Workout, Public.DTO.v1.WorkoutDTO >
{
    public WorkoutMapper(IMapper mapper) : base(mapper)
    {
    }
    
}