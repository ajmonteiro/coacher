using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Data;
using Coacher.Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Application.Services.MealService;

public class MealService : IMealService
{
    private readonly CoacherContext _context;

    public MealService(CoacherContext context)
    {
        _context = context;
    }
    
    
    public async Task<PagedResult<Meal>> GetAllAsync(int page = 1, int perPage = 10)
    {
        var query = _context.Meals
            .Include(w => w.MealFoods)
            .ThenInclude(w => w.Food)
            .AsNoTracking();
        
        var totalItems = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * perPage)
            .Take(perPage)
            .ToListAsync();

        return new PagedResult<Meal>
        {
            Page = page,
            PerPage = perPage,
            TotalItems = totalItems,
            Data = items,
        }; 
    }

    public async Task<Meal?> GetByIdAsync(Guid id)
    {
        return await _context.Meals
            .Include(w => w.MealFoods)
            .ThenInclude(w => w.Food)
            .FirstOrDefaultAsync(w => w.Id == id);
    }

    public async Task<Meal> CreateAsync(MealDto meal)
    {
        var newMeal = new Meal
        {
            DietId = meal.DietId,
            Name = meal.Name,
            Description = meal.Description,
        };

        foreach (var mealFoodDto in meal.MealFoods)
        {
            var food = await _context.Foods.FindAsync(mealFoodDto.FoodId);

            if (food == null)
            {
                throw new KeyNotFoundException();
            }

            var mealFood = new MealFood
            {
                Meal = newMeal,
                FoodId = food.Id,
                Quantity = mealFoodDto.Quantity,
                Unit = mealFoodDto.Unit,
            };
            
            newMeal.MealFoods.Add(mealFood);
        }
        
        _context.Meals.Add(newMeal);
        await _context.SaveChangesAsync();

        return newMeal;
    }

    public async Task<Meal> UpdateAsync(MealDto mealDto)
    {
        var meal = await _context.Meals.FindAsync(mealDto.Id);

        if (meal == null)
            throw new KeyNotFoundException();

        meal.Name = mealDto.Name;
        meal.Description = mealDto.Description;
        meal.DietId = mealDto.DietId;

        foreach (var foodDto in meal.MealFoods)
        {
            var food = await _context.Foods.FindAsync(foodDto.FoodId);
            if (food == null)
            {
                throw new KeyNotFoundException();
            }

            foodDto.Meal = meal;
            foodDto.Food = food;
            foodDto.Unit = foodDto.Unit;
            foodDto.Quantity = foodDto.Quantity;
        }

        await _context.SaveChangesAsync();
        return meal;
    }

    public async Task DeleteAsync(Guid id)
    {
        var meal = await _context.Meals.FindAsync(id);

        if (meal != null)
        {
            _context.Meals.Remove(meal);
            await _context.SaveChangesAsync();
        }
    }
}