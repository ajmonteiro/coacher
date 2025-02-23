


using Coacher.Backend.Domain.Data;
using Coacher.Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.WebAPI.Controllers.RolePermissionController
{
    [ApiController]
    [Route("api/role-permissions")]
    public class RolePermissionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RolePermissionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetRolePermissions()
        {
            var rolePermissions = await _context.RolePermissions.ToListAsync();
            return Ok(rolePermissions);
        }

        [HttpPost]
        public async Task<IActionResult> AddRolePermission([FromBody] RolePermission rolePermission)
        {
            _context.RolePermissions.Add(rolePermission);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRolePermissions), new { roleId = rolePermission.RoleId, permissionId = rolePermission.PermissionId }, rolePermission);
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveRolePermission([FromQuery] Guid roleId, [FromQuery] Guid permissionId)
        {
            var rolePermission = await _context.RolePermissions.FirstOrDefaultAsync(rp => rp.RoleId == roleId && rp.PermissionId == permissionId);
            if (rolePermission == null)
                return NotFound("Role permission not found.");

            _context.RolePermissions.Remove(rolePermission);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}