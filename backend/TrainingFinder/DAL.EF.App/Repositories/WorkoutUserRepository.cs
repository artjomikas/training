using DAL.Contracts.App;
using DAL.EF.Base;
using Domain.App;
using Microsoft.EntityFrameworkCore;

namespace DAL.EF.App.Repositories;

public class WorkoutUserRepository : EFBaseRepository<WorkoutUser, ApplicationDbContext>, IWorkoutUserRepository
{
    public WorkoutUserRepository(ApplicationDbContext dataContext) : base(dataContext)
    {
    }

    public override async Task<IEnumerable<WorkoutUser?>> AllAsync()
    {
        return await RepositoryDbSet
            .Include(e => e.AppUser)
            .Include(w => w.Workout)
            .ToListAsync();
    }

    public override async Task<WorkoutUser?> FindAsync(Guid id)
    {
        return await RepositoryDbSet
            .Include(r => r.AppUser)
            .Include(w => w.Workout)
            .FirstOrDefaultAsync(m => m.Id == id);
    }

    public async Task<IEnumerable<WorkoutUser>> GetScheduleForUser(WorkoutUser schedule)
    {
        return await RepositoryDbSet
            .Include(e => e.AppUser)
            .Include(w => w.Workout)
            .ThenInclude(a => a!.WorkoutUsers)!
            .ThenInclude(a => a.AppUser)
            .Include(a => a.Workout!.Intensity)
            .Include(a => a.Workout!.Location)
            .Include(a => a.Workout!.SkillLevel)
            .Include(a => a.Workout!.WorkoutType)
            .Where(e => e.AppUserId == schedule.AppUserId)
            .Where(p => p.Workout!.StartDate.Day >= DateTime.Now.Day)
            .ToListAsync();
    }

    public async Task<IEnumerable<WorkoutUser>> GetHistoryForUser(WorkoutUser schedule)
    {
        return await RepositoryDbSet
            .Include(e => e.AppUser)
            .Include(w => w.Workout)
            .ThenInclude(a => a!.WorkoutUsers)!
            .ThenInclude(a => a.AppUser)
            .Include(a => a.Workout!.Intensity)
            .Include(a => a.Workout!.Location)
            .Include(a => a.Workout!.SkillLevel)
            .Include(a => a.Workout!.WorkoutType)
            .Where(e => e.AppUserId == schedule.AppUserId)
            .Where(p => p.Workout!.StartDate.Day < DateTime.Now.Day)
            .ToListAsync();
    }
}