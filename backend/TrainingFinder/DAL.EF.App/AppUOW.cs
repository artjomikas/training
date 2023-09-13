using DAL.Contracts.App;
using DAL.EF.App.Repositories;
using DAL.EF.Base;

namespace DAL.EF.App;

public class AppUOW : EFBaseUOW<ApplicationDbContext>, IAppUOW
{
    public AppUOW(ApplicationDbContext dataContext) : base(dataContext)
    {
    }

    private IReviewRepository? _reviewRepository { get; }
    private ICommentRepository? _commentRepository { get; }
    private IIntensityRepository? _intensityRepository { get; }
    private ILocationRepository? _locationRepository { get; }
    private ISkillLevelRepository? _skillLevelRepository { get; }
    private IWorkoutRepository? _workoutRepository { get; }
    private IWorkoutTypeRepository? _workoutTypeRepository { get; }
    private IWorkoutUserRepository? _workoutUserRepository { get; }

    public IReviewRepository ReviewRepository =>
        _reviewRepository ?? new ReviewRepository(UOWDbContext);

    public ICommentRepository CommentRepository => _commentRepository ?? new CommentRepository(UOWDbContext);

    public IIntensityRepository IntensityRepository => _intensityRepository ?? new IntensityRepository(UOWDbContext);

    public ILocationRepository LocationRepository => _locationRepository ?? new LocationRepository(UOWDbContext);

    public ISkillLevelRepository SkillLevelRepository =>
        _skillLevelRepository ?? new SkillLevelRepository(UOWDbContext);

    public IWorkoutRepository WorkoutRepository => _workoutRepository ?? new WorkoutRepository(UOWDbContext);

    public IWorkoutTypeRepository WorkoutTypeRepository =>
        _workoutTypeRepository ?? new WorkoutTypeRepository(UOWDbContext);

    public IWorkoutUserRepository WorkoutUserRepository =>
        _workoutUserRepository ?? new WorkoutUserRepository(UOWDbContext);
}