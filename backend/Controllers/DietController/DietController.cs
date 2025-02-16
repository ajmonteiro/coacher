using backend.Models;
using backend.Entities;
using backend.Data;
using backend.Services.AuthService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Permission = backend.Services.AuthService.Permission;

namespace backend.Controllers.DietController
{
    [Route("api/[controller]")]
    [ApiController]
    public class DietController(AppDbContext context) : ControllerBase
    {
        public Diet Diet { get; set; } = new Diet();

        [Authorize(Roles = "Coach")]
        [HttpGet]
        [HasPermission(Permission.ReadDiet)]
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

        [Authorize(Roles = "Coach")]
        [HttpGet("{id}")]
        [HasPermission(Permission.ReadDiet)]
        public async Task<ActionResult<DietDto>> GetDiet(Guid id)
        {
            var diet = await context.Diets
                .Include(d => d.Meals)
                .ThenInclude(m => m.MealFoods)
                .ThenInclude(mf => mf.Food)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (diet == null)
            {
                return NotFound();
            }

            var dietDto = new DietDto
            {
                Id = diet.Id,
                UserId = diet.UserId,
                Name = diet.Name,
                Description = diet.Description,
                Meals = diet.Meals.Select(m => new MealDto
                {
                    Name = m.Name,
                    Description = m.Description,
                    MealFoods = m.MealFoods.Select(mf => new MealFoodDto
                    {
                        FoodId = mf.FoodId,
                        Quantity = mf.Quantity,
                        Unit = mf.Unit,
                        Food = new FoodDto
                        {
                            Name = mf.Food.Name,
                            Description = mf.Food.Description,
                            Calories = mf.Food.Calories,
                            Protein = mf.Food.Protein,
                            Carbs = mf.Food.Carbs,
                            Fat = mf.Food.Fat
                        }
                    }).ToList()
                }).ToList()
            };

            return dietDto;
        }

        [Authorize(Roles = "Coach")]
        [HttpPost]
        [HasPermission(Permission.CreateDiet)]
        public async Task<ActionResult<DietDto>> CreateDiet([FromBody] CreateDietDto createDietDto)
        {
            if (createDietDto == null)
            {
                return BadRequest("Diet data is required.");
            }

            var diet = new Diet
            {
                UserId = createDietDto.UserId,
                Name = createDietDto.Name,
                Description = createDietDto.Description
            };

            foreach (var mealDto in createDietDto.Meals)
            {
                var meal = new Meal
                {
                    Name = mealDto.Name,
                    Description = mealDto.Description
                };

                foreach (var mealFoodDto in mealDto.MealFoods)
                {
                    var food = await context.Foods.FindAsync(mealFoodDto.FoodId);
                    if (food == null)
                    {
                        return NotFound($"Food with ID {mealFoodDto.FoodId} not found.");
                    }

                    var mealFood = new MealFood
                    {
                        Food = food,
                        Quantity = mealFoodDto.Quantity,
                        Unit = mealFoodDto.Unit
                    };

                    meal.MealFoods.Add(mealFood);
                }

                diet.Meals.Add(meal);
            }

            context.Diets.Add(diet);
            await context.SaveChangesAsync();

            diet = await context.Diets
                .Include(d => d.Meals)
                .ThenInclude(m => m.MealFoods)
                .ThenInclude(mf => mf.Food)
                .FirstOrDefaultAsync(d => d.Id == diet.Id);

            var dietDto = new DietDto
            {
                Id = diet.Id,
                UserId = diet.UserId,
                Name = diet.Name,
                Description = diet.Description,
                Meals = diet.Meals.Select(m => new MealDto
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
                }).ToList()
            };

            return CreatedAtAction(nameof(GetDiet), new { id = diet.Id }, dietDto);
        }

        [Authorize(Roles = "Coach")]
        [HttpPut("{id}")]
        [HasPermission(Permission.EditDiet)]
        public async Task<ActionResult<Diet>> UpdateDiet(Guid id, Diet Diet)
        {
            if (id != Diet.Id)
                return BadRequest();
            context.Entry(Diet).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(Diet);
        }

        [Authorize(Roles = "Coach")]
        [HttpDelete("{id}")]
        [HasPermission(Permission.DeleteDiet)]
        public async Task<ActionResult<Diet>> DeleteDiet(Guid id)
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