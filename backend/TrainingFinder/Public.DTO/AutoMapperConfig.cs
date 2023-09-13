using AutoMapper;
using Domain.App;
using Domain.App.Identity;
using Public.DTO.v1;
using Public.DTO.v1.Identity;

namespace Public.DTO;

public class AutoMapperConfig : Profile
{
    public AutoMapperConfig()
    {
        CreateMap<WorkoutUser, WorkoutUsersDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
        
        CreateMap<BLL.DTO.WorkoutUser, ScheduleDTO>().ForMember(dest => dest.WorkoutUsers, opt =>
            opt.MapFrom(src => src.Workout!.WorkoutUsers)).ReverseMap();
        
        
        CreateMap<BLL.DTO.Workout, WorkoutDTO>().ReverseMap();
        CreateMap<Workout, WorkoutForProfileDTO>().ReverseMap();
        CreateMap<WorkoutType, WorkoutTypeDTO>().ReverseMap();
        CreateMap<SkillLevel, SkillLevelDTO>().ReverseMap();
        CreateMap<Intensity, IntensityDTO>().ReverseMap();
        CreateMap<Location, LocationDTO>().ReverseMap();
        
        CreateMap<BLL.DTO.Review, ReviewDTO>().ReverseMap();
        CreateMap<BLL.DTO.WorkoutUser, WorkoutUsersDTO>().ReverseMap();
        CreateMap<BLL.DTO.Comment, CommentDTO>().ReverseMap();

        CreateMap<Review, ReviewDTO>().ReverseMap();
        
        CreateMap<AppUser, UserDTO>().ReverseMap();
        CreateMap<AppUser, AppUserDTO>().ReverseMap();
        
        CreateMap<Comment, CommentDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
    }
}