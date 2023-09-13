using DAL.Contracts.App;
using DAL.Contracts.Base;

namespace BLL.Contracts.App;

public interface IWorkoutService: IBaseRepository<BLL.DTO.Workout>, IWorkoutRepositoryCustom<BLL.DTO.Workout>
{
    
}