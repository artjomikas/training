using DAL.Contracts.Base;

namespace DAL.Contracts.App;

public interface IAppUOW : IBaseUOW
{
    // list of repositories
    IReviewRepository ReviewRepository { get; }

    ICommentRepository CommentRepository { get; }
    IIntensityRepository IntensityRepository { get; }
    ILocationRepository LocationRepository { get; }
    ISkillLevelRepository SkillLevelRepository { get; }
    IWorkoutRepository WorkoutRepository { get; }
    IWorkoutTypeRepository WorkoutTypeRepository { get; }
    IWorkoutUserRepository WorkoutUserRepository { get; }
}