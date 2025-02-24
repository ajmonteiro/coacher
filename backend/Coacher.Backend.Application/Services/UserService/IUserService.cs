using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Entities;

namespace Coacher.Backend.Application.Services.UserService;

public interface IUserService
{
    Task<PagedResult<User>> GetAllAsync(int page = 1, int perPage = 10);
    Task<User?> GetByIdAsync(Guid id);
    Task<IEnumerable<SelectItemDto>> GetOptionsAsync();
    Task<User> GetCurrentAsync();
    Task<User> CreateAsync(UserDto user);
    Task<User> UpdateAsync(UserDto user);
    Task DeleteAsync(Guid id);
}