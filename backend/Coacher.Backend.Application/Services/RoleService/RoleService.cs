using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Data;
using Coacher.Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Application.Services.RoleService;

public class RoleService : IRoleService
{
    private readonly CoacherContext _context;

    public RoleService(CoacherContext context)
    {
        _context = context;
    }

    public async Task<Role> GetByIdAsync(Guid id)
    {
        var role = await _context.Roles.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        
        if (role == null)
        {
            throw new KeyNotFoundException();
        }

        return role;
    }

    public async Task<Role> GetByNameAsync(string name)
    {
        var role = await _context.Roles.AsNoTracking().FirstOrDefaultAsync(x => x.Name == name);

        if (role == null)
        {
            throw new KeyNotFoundException();
        }

        return role;
    }

    public async Task<IEnumerable<SelectItemDto>> GetOptionsAsync()
    {
        return await _context.Roles
            .Select(e => new SelectItemDto { label = e.Name, value = e.Id })
            .ToListAsync();
    }
}