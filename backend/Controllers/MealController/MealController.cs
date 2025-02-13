using Coacher.Entities;
using Coacher.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Coacher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController(AppDbContext context) : ControllerBase
    {
        public Meal Meal { get; set; } = new Meal();

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<object>> GetMeals(int page = 1, int perPage = 10)
        {
            if (page < 1 || perPage < 1)
                return BadRequest("Page and perPage must be greater than 0.");

            var totalItems = await context.Meals.CountAsync();

            var Meals = await context.Meals
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .ToListAsync();


            return Ok(new
            {
                TotalItems = totalItems,
                PerPage = perPage,
                Page = page,
                Data = Meals
            });
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Meal>> CreateMeal(Meal meal)
        {
            context.Meals.Add(meal);
            await context.SaveChangesAsync();
            return Ok(meal);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Meal>> UpdateMeal(int id, Meal meal)
        {
            if (id != meal.Id)
                return BadRequest();
            context.Entry(meal).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(meal);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Meal>> DeleteMeal(int id)
        {
            var meal = context.Meals.Find(id);
            if (meal is null)
                return NotFound();
            context.Meals.Remove(meal);
            await context.SaveChangesAsync();
            return Ok(meal);
        }
    }
}