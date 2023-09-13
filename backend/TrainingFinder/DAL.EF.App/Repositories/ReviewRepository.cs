using DAL.Contracts.App;
using DAL.EF.Base;
using Domain.App;
using Microsoft.EntityFrameworkCore;

namespace DAL.EF.App.Repositories;

public class ReviewRepository : EFBaseRepository<Review, ApplicationDbContext>, IReviewRepository
{
    public ReviewRepository(ApplicationDbContext dataContext) : base(dataContext)
    {
    }

    public override async Task<IEnumerable<Review?>> AllAsync()
    {
        return await RepositoryDbSet
            .Include(e => e.AppUser)
            .OrderBy(e => e.CreatedAt)
            .ToListAsync();
    }

    public virtual async Task<IEnumerable<Review>> AllAsync(Guid userId)
    {
        return await RepositoryDbSet
            .Where(e => e.AppUserId == userId)
            .OrderBy(e => e.CreatedAt)
            .ToListAsync();
    }

    public override async Task<Review?> FindAsync(Guid id)
    {
        return await RepositoryDbSet
            .Include(r => r.AppUser)
            .FirstOrDefaultAsync(m => m.Id == id);
    }


    public virtual async Task<Review?> FindAsync(Guid id, Guid userId)
    {
        return await RepositoryDbSet
            .Include(r => r.AppUser)
            .FirstOrDefaultAsync(m => m.Id == id && m.AppUserId == userId);
    }
}