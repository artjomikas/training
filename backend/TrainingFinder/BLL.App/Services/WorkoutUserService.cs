using BLL.Base;
using BLL.Contracts.App;
using BLL.DTO;
using Contracts.Base;
using DAL.Contracts.App;

namespace BLL.App;

public class WorkoutUserService: BaseEntityService<BLL.DTO.WorkoutUser, Domain.App.WorkoutUser, IWorkoutUserRepository>, IWorkoutUserService
{
    protected IAppUOW Uow;
    public WorkoutUserService(IAppUOW uow, IMapper<WorkoutUser, Domain.App.WorkoutUser> mapper) : base(uow.WorkoutUserRepository, mapper)
    {
        Uow = uow;
    }
    
    
    public async Task<IEnumerable<WorkoutUser>> GetScheduleForUser(WorkoutUser schedule)
    {
        var mapSchedule = Mapper.Map(schedule);
        return (await Uow.WorkoutUserRepository.GetScheduleForUser(mapSchedule!)).Select(e => Mapper.Map(e))!;
    }

    public async Task<IEnumerable<WorkoutUser>> GetHistoryForUser(WorkoutUser schedule)
    {
        var mapSchedule = Mapper.Map(schedule);
        return (await Uow.WorkoutUserRepository.GetHistoryForUser(mapSchedule!)).Select(e => Mapper.Map(e))!;
    }
}