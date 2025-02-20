using backend.Entities;
using backend.Models;

namespace backend.Services.UserService;

public interface IUserService
{
    Task<PagedResult<User>> GetAllAsync(int page = 1, int pageSize = 10);
    Task<User?> GetByIdAsync(Guid id);
    Task<IEnumerable<SelectItemDto>> GetOptionsAsync();
    Task<User> GetCurrentAsync();
    Task<User> CreateAsync(UserCreateDto user);
    Task<User> UpdateAsync(UserUpdateDto user);
    Task DeleteAsync(Guid id);
}