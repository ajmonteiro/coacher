using backend.Entities;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers.FoodController
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
        [HttpGet("options")]
        public async Task<ActionResult<IEnumerable<SelectItemDto>>> GetFoodOptions()
        {
            var foods = await context.Foods
                .AsQueryable()
                .Select(e => new SelectItemDto { label = e.Name!, value = e.Id })
                .ToListAsync();

            return Ok(foods);
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
        public async Task<ActionResult<Food>> UpdateFood(Guid id, Food food)
        {
            if (id != food.Id)
                return BadRequest();
            context.Entry(food).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(food);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Food>> DeleteFood(Guid id)
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