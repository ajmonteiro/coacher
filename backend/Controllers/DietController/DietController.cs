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

            var diets = await context.Diets
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
                Data = diets
            });
        }

        [HttpGet("{id}")]
        [HasPermission(Permission.ReadDiet)]
        public async Task<ActionResult<DietDto>> GetDiet(Guid id)
        {
            var diet = await context.Diets
                .Include(d => d.DietMeals)
                .ThenInclude(dm => dm.Meal)
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
                Meals = diet.DietMeals.Select(dm => new MealDto
                {
                    Id = dm.Meal.Id,
                    Name = dm.Meal.Name,
                    Description = dm.Meal.Description,
                    MealFoods = dm.Meal.MealFoods.Select(mf => new MealFoodDto
                    {
                        FoodId = mf.FoodId,
                        Quantity = mf.Quantity,
                        Unit = mf.Unit,
                        Food = new FoodDto
                        {
                            Id = mf.Food.Id,
                        }
                    }).ToList()
                }).ToList()
            };

            return Ok(dietDto);
        }

        
        [Authorize(Roles = "Coach")]
        [HttpPost]
        [HasPermission(Permission.CreateDiet)]
        public async Task<ActionResult<DietDto>> CreateDiet([FromBody] CreateDietDto createDietDto)
        {
            var diet = new Diet
            {
                UserId = createDietDto.UserId,
                Name = createDietDto.Name,
                Description = createDietDto.Description,
                Meals = new List<Meal>()
            };

            foreach (var mealDto in createDietDto.Meals)
            {
                var meal = new Meal
                {
                    Name = mealDto.Name,
                    Description = mealDto.Description,
                    MealFoods = new List<MealFood>()
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
                        Meal = meal,
                        Food = food,
                        Quantity = mealFoodDto.Quantity,
                        Unit = mealFoodDto.Unit
                    };

                    meal.MealFoods.Add(mealFood);
                    context.MealFoods.Add(mealFood);
                }

                diet.Meals.Add(meal);
            }

            context.Diets.Add(diet);

            foreach (var meal in diet.Meals)
            {
                var dietMeal = new DietMeal
                {
                    DietId = diet.Id,
                    MealId = meal.Id
                };
                context.DietMeals.Add(dietMeal);
            }

            try
            {
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving diet: {ex}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException}");
                }
                return StatusCode(500, "Error saving diet.");
            }

            diet = await context.Diets
                .Include(d => d.Meals)
                .ThenInclude(m => m.MealFoods)
                .ThenInclude(mf => mf.Food)
                .FirstOrDefaultAsync(d => d.Id == diet.Id);

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
                    Id = m.Id,
                    Name = m.Name,
                    Description = m.Description,
                    DietId = m.DietId,
                    MealFoods = m.MealFoods.Select(mf => new MealFoodDto
                    {
                        FoodId = mf.Food.Id,
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
        public async Task<ActionResult<DietDto>> UpdateDiet(Guid id, [FromBody] UpdateDietDto updateDietDto)
        {
            if (id != updateDietDto.Id)
            {
                return BadRequest("Diet ID mismatch.");
            }

            var diet = await context.Diets
                .Include(d => d.Meals)
                .ThenInclude(m => m.MealFoods)
                .ThenInclude(mf => mf.Food)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (diet == null)
            {
                return NotFound();
            }

            diet.UserId = updateDietDto.UserId;
            diet.Name = updateDietDto.Name;
            diet.Description = updateDietDto.Description;

            foreach (var meal in diet.Meals.ToList())
            {
                foreach (var mealFood in meal.MealFoods.ToList())
                {
                    context.MealFoods.Remove(mealFood);
                }
                context.Meals.Remove(meal);
            }
            
            await context.SaveChangesAsync();

                diet.Meals = new List<Meal>();

                foreach (var mealDto in updateDietDto.Meals)
                {
                    var meal = new Meal
                    {
                        Name = mealDto.Name,
                        Description = mealDto.Description,
                        MealFoods = new List<MealFood>()
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
                            Meal = meal,
                            Food = food,
                            Quantity = mealFoodDto.Quantity,
                            Unit = mealFoodDto.Unit
                        };

                        meal.MealFoods.Add(mealFood);
                        context.MealFoods.Add(mealFood);
                    }

                    diet.Meals.Add(meal);
                }

                foreach (var meal in diet.Meals)
                {
                    var dietMeal = new DietMeal
                    {
                        DietId = diet.Id,
                        MealId = meal.Id
                    };
                    context.DietMeals.Add(dietMeal);
                }

                try
                {
                    await context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }

                diet = await context.Diets
                   .Include(d => d.Meals)
                   .ThenInclude(m => m.MealFoods)
                   .ThenInclude(mf => mf.Food)
                   .FirstOrDefaultAsync(d => d.Id == diet.Id);

                var dietDto = new DietDto
                {
                    Id = diet!.Id,
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
                            FoodId = mf.Food.Id,
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

                return Ok(dietDto);
        }


        [Authorize(Roles = "Coach")]
        [HttpDelete("{id}")]
        [HasPermission(Permission.DeleteDiet)]
        public async Task<ActionResult<Diet>> DeleteDiet(Guid id)
        {
            var diet = context.Diets.Find(id);
            if (Diet is null)
                return NotFound();
            context.Diets.Remove(Diet);
            await context.SaveChangesAsync();
            return Ok(Diet);
        }
    }
}