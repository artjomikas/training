using BLL.Base;
using BLL.Contracts.App;
using BLL.DTO;
using Contracts.Base;
using DAL.Contracts.App;

namespace BLL.App;

public class WorkoutService : BaseEntityService<BLL.DTO.Workout, Domain.App.Workout, IWorkoutRepository>, IWorkoutService
{
    protected IAppUOW Uow;
    public WorkoutService(IAppUOW uow, IMapper<Workout, Domain.App.Workout> mapper) : base(uow.WorkoutRepository, mapper)
    {
        Uow = uow;
    }


    public async Task<IEnumerable<DTO.Workout>> AllAsyncByDate(DateTime date,Guid workoutTypeId)
    {
        return (await Uow.WorkoutRepository.AllAsyncByDate(date, workoutTypeId)).Select(e => Mapper.Map(e))!;
    }

    public async Task<bool> IsOwnedByUserAsync(Guid id, Guid userId)
    {
        return await Uow.WorkoutRepository.IsOwnedByUserAsync(id, userId);
    }
}