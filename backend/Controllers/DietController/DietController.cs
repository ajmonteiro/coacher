using Coacher.Entities;
using Coacher.Data;
using Coacher.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Coacher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DietController(AppDbContext context) : ControllerBase
    {
        public Diet Diet { get; set; } = new Diet();

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<object>> GetDiets(int page = 1, int perPage = 10)
        {
            if (page < 1 || perPage < 1)
                return BadRequest("Page and perPage must be greater than 0.");

            var totalItems = await context.Diets.CountAsync();

            var Diets = await context.Diets
                .Include(w => w.DietMeals)
                    .ThenInclude(we => we.Meal)
                .Select(w => new
                {
                    w.Id,
                    w.Name,
                    w.Description,
                    w.User,
                    meals = w.DietMeals.Select(we => new
                    {
                        we.Meal.Id,
                        we.Meal.Name,
                        we.Meal.Description,
                    }).ToList()
                })
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .ToListAsync();


            return Ok(new
            {
                TotalItems = totalItems,
                PerPage = perPage,
                Page = page,
                Data = Diets
            });
        }


        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<Diet> GetDiet(int id)
        {
            var Diet = context.Diets.Find(id);
            if (Diet is null)
                return NotFound();
            return Diet;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<DietResponseDto>> CreateDiet(DietCreateDto DietDto)
        {
            var Diet = new Diet
            {
                Name = DietDto.Name,
                Description = DietDto.Description,
                UserId = DietDto.UserId
            };

            using var transaction = context.Database.BeginTransaction();

            context.Diets.Add(Diet);
            await context.SaveChangesAsync();

            foreach (var Meal in DietDto.Meals)
            {
                var existingDietMeal = await context.DietMeals.FirstOrDefaultAsync(we =>
                    we.DietId == Diet.Id && we.MealId == Meal.MealId);

                if (existingDietMeal == null)
                {
                    var DietMeal = new DietMeal
                    {
                        DietId = Diet.Id,
                        MealId = Meal.MealId,
                    };
                    context.DietMeals.Add(DietMeal);
                }
                else
                {
                    context.DietMeals.Update(existingDietMeal);
                }
            }

            await context.SaveChangesAsync();
            await transaction.CommitAsync();

            var DietResponse = new DietResponseDto
            {
                Id = Diet.Id,
                Name = Diet.Name,
                Description = Diet.Description,
                UserId = Diet.UserId,
                Meals = context.DietMeals
                    .Include(we => we.Meal)
                    .Where(we => we.DietId == Diet.Id)
                    .Select(we => new MealInDietDto
                    {
                        MealId = we.MealId,
                        Name = we.Meal.Name,
                    }).ToList()
            };

            return Ok(DietResponse);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Diet>> UpdateDiet(int id, Diet Diet)
        {
            if (id != Diet.Id)
                return BadRequest();
            context.Entry(Diet).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(Diet);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Diet>> DeleteDiet(int id)
        {
            var Diet = context.Diets.Find(id);
            if (Diet is null)
                return NotFound();
            context.Diets.Remove(Diet);
            await context.SaveChangesAsync();
            return Ok(Diet);
        }
    }
}