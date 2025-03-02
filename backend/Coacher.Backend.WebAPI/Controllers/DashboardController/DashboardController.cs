using Coacher.Backend.Domain.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Coacher.Backend.Application.Services.DashboardService;
using Coacher.Backend.Contracts.Dto;

namespace Coacher.Backend.WebAPI.Controllers.DashboardController
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Coach, User")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("stats")]
        public async Task<ActionResult<DashboardDto>> GetDashboardAsync()
        {
            try
            {
                var dashboard = await _dashboardService.GetDashboardAsync();
                return Ok(dashboard);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}