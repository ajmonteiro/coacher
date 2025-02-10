using Coacher.Entities;
using Coacher.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController(AppDbContext context) : ControllerBase
    {
        public Meal Meal { get; set; } = new Meal();

        [HttpGet]
        public ActionResult<IEnumerable<Meal>> GetMeals()
        {
            return context.Meals;
        }

        [HttpGet("{id}")]
        public ActionResult<Meal> GetMeal(int id)
        {
            var meal = context.Meals.Find(id);
            if (meal is null)
                return NotFound();
            return meal;
        }

        [HttpPost]
        public async Task<ActionResult<Meal>> CreateMeal(Meal meal)
        {
            context.Meals.Add(meal);
            await context.SaveChangesAsync();
            return Ok(meal);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Meal>> UpdateMeal(int id, Meal meal)
        {
            if (id != meal.Id)
                return BadRequest();
            context.Entry(meal).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(meal);
        }

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