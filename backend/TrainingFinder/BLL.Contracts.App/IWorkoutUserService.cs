using DAL.Contracts.App;
using DAL.Contracts.Base;

namespace BLL.Contracts.App;

public interface IWorkoutUserService: IBaseRepository<BLL.DTO.WorkoutUser>, IWorkoutUserRepositoryCustom<BLL.DTO.WorkoutUser>
{
    
}