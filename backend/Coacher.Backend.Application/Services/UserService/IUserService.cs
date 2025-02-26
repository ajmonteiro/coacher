using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Entities;

namespace Coacher.Backend.Application.Services.UserService;

public interface IUserService
{
    Task<PagedResult<UserDto>> GetAllAsync(int page = 1, int perPage = 10);
    Task<UserDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<SelectItemDto>> GetOptionsAsync();
    Task<UserDto> GetCurrentAsync();
    Task<UserDto> CreateAsync(UserDto user);
    Task<UserDto> UpdateAsync(UserDto user);
    Task DeleteAsync(Guid id);
}