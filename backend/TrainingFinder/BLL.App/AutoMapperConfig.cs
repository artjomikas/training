using AutoMapper;
using Domain.App.Identity;

namespace BLL.App;

public class AutoMapperConfig : Profile
{
    public AutoMapperConfig()
    {
        CreateMap<BLL.DTO.Workout, Domain.App.Workout>().ReverseMap();

        CreateMap<BLL.DTO.WorkoutUser, Domain.App.WorkoutUser>().ReverseMap();

        CreateMap<BLL.DTO.Comment, Domain.App.Comment>().ReverseMap();
        
        CreateMap<BLL.DTO.Review, Domain.App.Review>().ReverseMap();
    }
}