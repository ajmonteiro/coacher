using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Data;
using Coacher.Backend.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Application.Services.DietService;

public class DietService : IDietService
{
        private readonly CoacherContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        
        public DietService(CoacherContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<PagedResult<Diet>> GetAllAsync(int page = 1, int perPage = 10)
        {
            var query = _context.Diets
                .Include(w => w.Meals)
                .Include(w => w.DietMeals)
                .AsNoTracking();
        
            var totalItems = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .ToListAsync();

            return new PagedResult<Diet>
            {
                Page = page,
                PerPage = perPage,
                TotalItems = totalItems,
                Data = items,
            };
        }

        public async Task<DietDto> GetDietAsync(Guid id)
        {
            var diet = await _context.Diets
                .Include(d => d.DietMeals)
                .ThenInclude(dm => dm.Meal)
                .ThenInclude(m => m.MealFoods)
                .ThenInclude(mf => mf.Food)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (diet == null)
                throw new KeyNotFoundException($"Diet with ID {id} not found");

            return new DietDto
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
                        FoodId = mf.Food.Id,
                        Quantity = mf.Quantity,
                        Unit = mf.Unit,
                    }).ToList()
                }).ToList()
            };
        }

        public async Task<DietDto> CreateDietAsync(DietDto createDietDto)
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
                    var food = await _context.Foods.FindAsync(mealFoodDto.FoodId);
                    if (food == null)
                        throw new KeyNotFoundException();

                    var mealFood = new MealFood
                    {
                        Meal = meal,
                        Food = food,
                        Quantity = mealFoodDto.Quantity,
                        Unit = mealFoodDto.Unit
                    };

                    meal.MealFoods.Add(mealFood);
                    _context.MealFoods.Add(mealFood);
                }

                diet.Meals.Add(meal);
            }

            _context.Diets.Add(diet);

            foreach (var meal in diet.Meals)
            {
                var dietMeal = new DietMeal
                {
                    DietId = diet.Id,
                    MealId = meal.Id
                };
                _context.DietMeals.Add(dietMeal);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            diet = await _context.Diets
                .Include(d => d.Meals)
                .ThenInclude(m => m.MealFoods)
                .ThenInclude(mf => mf.Food)
                .FirstOrDefaultAsync(d => d.Id == diet.Id);

            if (diet == null)
                throw new KeyNotFoundException();

            return new DietDto
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
                    }).ToList()
                }).ToList()
            };
        }

        public async Task<DietDto> UpdateDietAsync(DietDto updateDietDto)
        {
            if (updateDietDto.Id == null)
                throw new KeyNotFoundException();
            
            var diet = await _context.Diets
                .Include(d => d.Meals)
                .ThenInclude(m => m.MealFoods)
                .ThenInclude(mf => mf.Food)
                .FirstOrDefaultAsync(d => d.Id == updateDietDto.Id);

            if (diet == null)
                throw new KeyNotFoundException();

            diet.UserId = updateDietDto.UserId;
            diet.Name = updateDietDto.Name;
            diet.Description = updateDietDto.Description;

            foreach (var meal in diet.Meals.ToList())
            {
                foreach (var mealFood in meal.MealFoods.ToList())
                {
                    _context.MealFoods.Remove(mealFood);
                }
                _context.Meals.Remove(meal);
            }
            
            await _context.SaveChangesAsync();

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
                    var food = await _context.Foods.FindAsync(mealFoodDto.FoodId);
                    
                    if (food == null)  
                        throw new KeyNotFoundException();

                    var mealFood = new MealFood
                    {
                        Meal = meal,
                        Food = food,
                        Quantity = mealFoodDto.Quantity,
                        Unit = mealFoodDto.Unit
                    };

                    meal.MealFoods.Add(mealFood);
                    _context.MealFoods.Add(mealFood);
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
                _context.DietMeals.Add(dietMeal);
            }

            await _context.SaveChangesAsync();

            diet = await _context.Diets
               .Include(d => d.Meals)
               .ThenInclude(m => m.MealFoods)
               .ThenInclude(mf => mf.Food)
               .FirstOrDefaultAsync(d => d.Id == diet.Id);

            if (diet == null)
                throw new KeyNotFoundException();

            return new DietDto
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
                    }).ToList()
                }).ToList()
            };
        }

        public async Task DeleteDietAsync(Guid id)
        {
            var diet = await _context.Diets.FindAsync(id);

            if (diet != null)
            {
                _context.Diets.Remove(diet);
                await _context.SaveChangesAsync();
            }
        }
}