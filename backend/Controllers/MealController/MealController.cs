using backend.Entities;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using backend.Models;

namespace backend.Controllers.MealController
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController(AppDbContext context) : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<object>> GetMeals(int page = 1, int perPage = 10)
        {
            if (page < 1 || perPage < 1)
                return BadRequest("Page and perPage must be greater than 0.");

            var totalItems = await context.Meals.CountAsync();

            var meals = await context.Meals
                .Include(m => m.MealFoods)
                .ThenInclude(mf => mf.Food)
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .ToListAsync();

            var mealDtos = meals.Select(m => new MealDto
            {
                Id = m.Id,
                Name = m.Name,
                Description = m.Description,
                DietId = m.DietId,
                MealFoods = m.MealFoods.Select(mf => new MealFoodDto
                {
                    FoodId = mf.FoodId,
                    Quantity = mf.Quantity,
                    Unit = mf.Unit,
                    Food = new FoodDto
                    {
                        Id = mf.Food.Id,
                        Name = mf.Food.Name,
                        Description = mf.Food.Description,
                        Calories = mf.Food.Calories,
                        Protein = mf.Food.Protein,
                        Carbs = mf.Food.Carbs,
                        Fat = mf.Food.Fat
                    }
                }).ToList()
            }).ToList();

            return Ok(new
            {
                TotalItems = totalItems,
                PerPage = perPage,
                Page = page,
                Data = mealDtos
            });
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<MealDto>> GetMeal(Guid id)
        {
            var meal = await context.Meals
                .Include(m => m.MealFoods)
                .ThenInclude(mf => mf.Food)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (meal == null)
            {
                return NotFound();
            }

            var mealDto = new MealDto
            {
                Id = meal.Id,
                Name = meal.Name,
                Description = meal.Description,
                DietId = meal.DietId,
                MealFoods = meal.MealFoods.Select(mf => new MealFoodDto
                {
                    FoodId = mf.FoodId,
                    Quantity = mf.Quantity,
                    Unit = mf.Unit,
                    Food = new FoodDto
                    {
                        Id = mf.Food.Id,
                        Name = mf.Food.Name,
                        Description = mf.Food.Description,
                        Calories = mf.Food.Calories,
                        Protein = mf.Food.Protein,
                        Carbs = mf.Food.Carbs,
                        Fat = mf.Food.Fat
                    }
                }).ToList()
            };

            return mealDto;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Meal>> CreateMeal([FromBody] CreateMealDto createMealDto)
        {
            if (createMealDto == null)
            {
                return BadRequest("Meal data is required.");
            }

            var meal = new Meal { Name = createMealDto.Name, Description = createMealDto.Description, DietId = createMealDto.DietId };

            foreach (var mealFoodDto in createMealDto.MealFoods)
            {
                var food = await context.Foods.FindAsync(mealFoodDto.FoodId);
                if (food == null)
                {
                    return NotFound($"Food with ID {mealFoodDto.FoodId} not found.");
                }

                var mealFood = new MealFood
                {
                    Meal = meal,
                    FoodId = food.Id,
                    Quantity = mealFoodDto.Quantity,
                    Unit = mealFoodDto.Unit
                };

                meal.MealFoods.Add(mealFood);
            }

            context.Meals.Add(meal);
            await context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetMeal), new { id = meal.Id });
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Meal>> UpdateMeal(Guid id, Meal meal)
        {
            if (id != meal.Id)
                return BadRequest();

            var existingMeal = await context.Meals
                .Include(m => m.MealFoods)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (existingMeal == null)
            {
                return NotFound();
            }

            existingMeal.Name = meal.Name;
            existingMeal.Description = meal.Description;
            existingMeal.DietId = meal.DietId;

            context.MealFoods.RemoveRange(existingMeal.MealFoods);
            existingMeal.MealFoods.Clear();

            foreach (var mealFoodDto in meal.MealFoods)
            {
                var food = await context.Foods.FindAsync(mealFoodDto.FoodId);
                if (food == null)
                {
                    return NotFound($"Food with ID {mealFoodDto.FoodId} not found.");
                }

                var mealFood = new MealFood
                {
                    Meal = existingMeal,
                    FoodId = food.Id,
                    Quantity = mealFoodDto.Quantity,
                    Unit = mealFoodDto.Unit
                };
                existingMeal.MealFoods.Add(mealFood);
            }



            await context.SaveChangesAsync();
            return Ok(existingMeal);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Meal>> DeleteMeal(Guid id)
        {
            var meal = await context.Meals.FindAsync(id);
            if (meal == null)
                return NotFound();

            var mealFoodsToRemove = context.MealFoods.Where(mf => mf.MealId == id);
            context.MealFoods.RemoveRange(mealFoodsToRemove);

            context.Meals.Remove(meal);
            await context.SaveChangesAsync();
            return Ok(meal);
        }
    }
}
