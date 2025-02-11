using Coacher.Entities;
using Coacher.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Coacher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController(AppDbContext context) : ControllerBase
    {
        [Authorize]
        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetStats()
        {
            var totalUsers = await context.Users.CountAsync();
            var totalFoods = await context.Foods.CountAsync();

            return Ok(new
            {
                TotalUsers = totalUsers,
                TotalFoods = totalFoods,
            });
        }
    }
}