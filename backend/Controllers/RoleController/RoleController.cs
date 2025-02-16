using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Services.AuthService;

namespace backend.Controllers.RoleController
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Coach")]
    public class RoleController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        [HasPermission(Permission.ReadRole)]
        public async Task<ActionResult<IEnumerable<SelectItemDto>>> GetRoleOptions()
        {
            var roles = await context.Roles
                .Select(e => new SelectItemDto { label = e.Name, value = e.Id })
                .ToListAsync();

            return Ok(roles);
        }
    }
}
