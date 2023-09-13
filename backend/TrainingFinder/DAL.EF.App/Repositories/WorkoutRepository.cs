using DAL.Contracts.App;
using DAL.EF.Base;
using Domain.App;
using Microsoft.EntityFrameworkCore;

namespace DAL.EF.App.Repositories;

public class WorkoutRepository : EFBaseRepository<Workout, ApplicationDbContext>, IWorkoutRepository
{
    public WorkoutRepository(ApplicationDbContext dataContext) : base(dataContext)
    {
    }

    public override async Task<IEnumerable<Workout?>> AllAsync()
    {
        return await RepositoryDbSet
            .Include(e => e.AppUser)
            .Include(s => s.SkillLevel)
            .Include(t => t.WorkoutType)
            .Include(l => l.Location)
            .Include(i => i.Intensity)
            .Include(c => c.Comments)
            .Include(w => w.WorkoutUsers)
            .OrderBy(e => e.StartDate)
            .ToListAsync();
    }

    public override async Task<Workout?> FindAsync(Guid id)
    {
        return await RepositoryDbSet
            .Include(e => e.AppUser)
            .Include(s => s.SkillLevel)
            .Include(t => t.WorkoutType)
            .Include(l => l.Location)
            .Include(c => c.Comments)
            .Include(i => i.Intensity)
            .Include(w => w.WorkoutUsers)!
            .ThenInclude(i => i.AppUser)
            .FirstOrDefaultAsync(m => m.Id == id);
    }

    public async Task<IEnumerable<Workout>> AllAsyncByDate(DateTime date, Guid workoutTypeId)
    {
        if (workoutTypeId == Guid.Parse("8c090c9d-b0f4-4d83-a6c2-4bf94f4346bc"))
        {
            return await RepositoryDbSet
                .Where(p => p.StartDate.Day == date.Day)
                .Include(w => w.WorkoutUsers)
                .Include(e => e.AppUser)
                .Include(c => c.Comments)
                .Include(s => s.SkillLevel)
                .Include(t => t.WorkoutType)
                .Include(l => l.Location)
                .Include(i => i.Intensity)
                .OrderBy(e => e.StartDate)
                .ToListAsync();
        }
        return await RepositoryDbSet
            .Where(p => p.StartDate.Day == date.Day)
            .Where(g => g.WorkoutTypeId == workoutTypeId)
            .Include(w => w.WorkoutUsers)
            .Include(e => e.AppUser)
            .Include(c => c.Comments)
            .Include(s => s.SkillLevel)
            .Include(t => t.WorkoutType)
            .Include(l => l.Location)
            .Include(i => i.Intensity)
            .OrderBy(e => e.StartDate)
            .ToListAsync();
       
    }

    public async Task<bool> IsOwnedByUserAsync(Guid id, Guid userId)
    {
        return await RepositoryDbSet.AnyAsync(t => t.Id == id && t.AppUserId == userId);
    }
}