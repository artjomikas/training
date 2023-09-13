using AutoMapper;
using BLL.App.Mappers;
using BLL.Base;
using BLL.Contracts.App;
using DAL.Contracts.App;



namespace BLL.App;

public class AppBLL : BaseBLL<IAppUOW>, IAppBLL
{
    protected new readonly IAppUOW Uow;
    private readonly IMapper _mapper;

    public AppBLL(IAppUOW uow, IMapper mapper ) : base(uow)
    {
        Uow = uow;
        _mapper = mapper;
    }

    public IWorkoutService? _workouts;
    
    public IWorkoutService WorkoutService =>
        _workouts ??= new WorkoutService(Uow, new WorkoutMapper(_mapper));

    public IWorkoutUserService? _workoutUsers;
    
    public IWorkoutUserService WorkoutUserService =>
        _workoutUsers ??= new WorkoutUserService(Uow, new WorkoutUserMapper(_mapper));
    
    public ICommentService? _commentService;
    public ICommentService CommentService =>
        _commentService ??= new CommentService(Uow, new CommentsMapper(_mapper));

    
    public IReviewService? _reviewService;
    public IReviewService ReviewService =>
        _reviewService ??= new ReviewService(Uow, new ReviewsMapper(_mapper));

}
