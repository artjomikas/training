using AutoMapper;
using DAL.Base;

namespace Public.DTO.Mappers;

public class UserMapper : BaseMapper<Public.DTO.v1.AppUserDTO, Domain.App.Identity.AppUser>
{
    public UserMapper(IMapper mapper) : base(mapper)
    {
    }
}