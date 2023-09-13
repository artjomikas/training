using BLL.Base;
using BLL.Contracts.App;
using BLL.DTO;
using Contracts.Base;
using DAL.Contracts.App;

namespace BLL.App;

public class ReviewService : BaseEntityService<BLL.DTO.Review, Domain.App.Review, IReviewRepository>, IReviewService
{
    protected IAppUOW Uow;

    public ReviewService(IAppUOW uow, IMapper<Review, Domain.App.Review> mapper) : base(uow.ReviewRepository, mapper)
    {
        Uow = uow;
    }
    
}