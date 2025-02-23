using Coacher.Backend.Application.Services.RoleService;
using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.WebAPI.Controllers.RoleController
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private IRoleService _roleService;
        private ILogger _logger;

        public RoleController(IRoleService roleService, ILogger<RoleController> logger)
        {
            _roleService = roleService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SelectItemDto>>> GetRoleOptions()
        {
            try
            {
                var roles = await _roleService.GetOptionsAsync();
                return Ok(roles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting role options");
                return StatusCode(500);
            }
        }
    }
}
