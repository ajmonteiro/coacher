using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Entities;

namespace Coacher.Backend.Application.Services.RoleService;

public interface IRoleService
{
    public Task<Role> GetByIdAsync(Guid id);
    public Task<Role> GetByNameAsync(string name);
    public Task<IEnumerable<SelectItemDto>> GetOptionsAsync();
}
