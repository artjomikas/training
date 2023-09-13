using BLL.Contracts.Base;

namespace BLL.Contracts.App;

public interface IAppBLL: IBaseBLL
{
    IWorkoutService WorkoutService { get; }
    IWorkoutUserService WorkoutUserService { get; }
    ICommentService CommentService { get; }
    IReviewService ReviewService { get; }
}