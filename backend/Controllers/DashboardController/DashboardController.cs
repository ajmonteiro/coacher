using backend.Entities;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers.DashboardController
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
            var totalExercises = await context.Exercises.CountAsync();
            var users = await context.Users.ToListAsync();

            return Ok(new
            {
                TotalUsers = totalUsers,
                TotalFoods = totalFoods,
                TotalExercises = totalExercises,
                Users = users
            });
        }
    }
}