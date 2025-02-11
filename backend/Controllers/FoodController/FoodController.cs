using Coacher.Entities;
using Coacher.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Coacher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController(AppDbContext context) : ControllerBase
    {
        public Food food { get; set; } = new Food();

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<object>> GetFoods(int page = 1, int perPage = 10)
        {
             if (page < 1 || perPage < 1)
                return BadRequest("Page and perPage must be greater than 0.");

            var totalItems = await context.Foods.CountAsync();
            var foods = await context.Foods
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .ToListAsync();

            return Ok(new
            {
                TotalItems = totalItems,
                PerPage = perPage,
                Page = page,
                Data = foods
            });
        }

        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<Food> GetFood(int id)
        {
            var food = context.Foods.Find(id);
            if (food is null)
                return NotFound();
            return food;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Food>> CreateFood(Food food)
        {
            context.Foods.Add(food);
            await context.SaveChangesAsync();
            return Ok(food);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Food>> UpdateFood(int id, Food food)
        {
            if (id != food.Id)
                return BadRequest();
            context.Entry(food).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(food);
        }

        [Authorize]
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