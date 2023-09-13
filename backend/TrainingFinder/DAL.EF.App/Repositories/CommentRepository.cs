using DAL.Contracts.App;
using DAL.EF.Base;
using Domain.App;
using Microsoft.EntityFrameworkCore;

namespace DAL.EF.App.Repositories;

public class CommentRepository : EFBaseRepository<Comment, ApplicationDbContext>, ICommentRepository
{
    public CommentRepository(ApplicationDbContext dataContext) : base(dataContext)
    {
    }

    public override async Task<IEnumerable<Comment?>> AllAsync()
    {
        return await RepositoryDbSet
            .Include(e => e.AppUser)
            .Include(t => t.Workout)
            .OrderBy(e => e.CreatedAt)
            .ToListAsync();
    }
    


    public override async Task<Comment?> FindAsync(Guid id)
    {
        return await RepositoryDbSet
            .Include(r => r.AppUser)
            .Include(t => t.Workout)
            .FirstOrDefaultAsync(m => m.Id == id);
    }

    public async Task<IEnumerable<Comment>> GetCommentsByWorkoutId(Guid id)
    {
        return await RepositoryDbSet
            .Include(e => e.AppUser)
            .Where(e => e.Id == id)
            .OrderBy(e => e.CreatedAt)
            .ToListAsync();
    }

    public async Task<bool> IsOwnedByUserAsync(Guid id, Guid userId)
    {
        return await RepositoryDbSet.AnyAsync(t => t.Id == id && t.AppUserId == userId);
    }
}