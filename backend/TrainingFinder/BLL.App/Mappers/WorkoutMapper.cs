using AutoMapper;
using DAL.Base;

namespace BLL.App.Mappers;

public class WorkoutMapper : BaseMapper<BLL.DTO.Workout, Domain.App.Workout>
{
    public WorkoutMapper(IMapper mapper) : base(mapper)
    {
    }
}