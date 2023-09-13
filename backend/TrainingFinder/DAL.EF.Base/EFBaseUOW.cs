using DAL.Contracts.Base;
using Microsoft.EntityFrameworkCore;

namespace DAL.EF.Base;

public class EFBaseUOW<TDbContext> : IBaseUOW
    where TDbContext : DbContext
{
    protected readonly TDbContext UOWDbContext;

    public EFBaseUOW(TDbContext dataContext)
    {
        UOWDbContext = dataContext;
    }

    public virtual async Task<int> SaveChangesAsync()
    {
        return await UOWDbContext.SaveChangesAsync();
    }
}