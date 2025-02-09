using Coacher.Entities;
using Coacher.Data;
using Microsoft.AspNetCore.Mvc;


namespace Coacher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class FoodController(AppDbContext context) : ControllerBase
    {
        public Food food { get; set; } = new Food();

        [HttpPost]
        public async Task<ActionResult<Food>> CreateFood(Food food)
        {
            context.Foods.Add(food);
            await context.SaveChangesAsync();
            return Ok(food);
        }

    }
}