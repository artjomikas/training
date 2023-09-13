using DAL.Contracts.App;
using DAL.EF.Base;
using Domain.App;

namespace DAL.EF.App.Repositories;

public class SkillLevelRepository : EFBaseRepository<SkillLevel, ApplicationDbContext>, ISkillLevelRepository
{
    public SkillLevelRepository(ApplicationDbContext dataContext) : base(dataContext)
    {
    }
}