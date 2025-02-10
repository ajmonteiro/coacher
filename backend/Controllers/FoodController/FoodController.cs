using Coacher.Entities;
using Coacher.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController(AppDbContext context) : ControllerBase
    {
        public Food food { get; set; } = new Food();

        [HttpGet]
        public ActionResult<IEnumerable<Food>> GetFoods()
        {
            return context.Foods;
        }

        [HttpGet("{id}")]
        public ActionResult<Food> GetFood(int id)
        {
            var food = context.Foods.Find(id);
            if (food is null)
                return NotFound();
            return food;
        }

        [HttpPost]
        public async Task<ActionResult<Food>> CreateFood(Food food)
        {
            context.Foods.Add(food);
            await context.SaveChangesAsync();
            return Ok(food);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Food>> UpdateFood(int id, Food food)
        {
            if (id != food.Id)
                return BadRequest();
            context.Entry(food).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(food);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Food>> DeleteFood(int id)
        {
            var food = context.Foods.Find(id);
            if (food is null)
                return NotFound();
            context.Foods.Remove(food);
            await context.SaveChangesAsync();
            return Ok(food);
        }
    }
}