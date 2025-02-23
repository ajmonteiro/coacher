using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Data;
using Coacher.Backend.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Application.Services.FoodService;

public class FoodService : IFoodService
{
    private readonly AppDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public FoodService(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _context = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }
    
    public async Task<PagedResult<FoodDto>> GetAllAsync(int page = 1, int pageSize = 10)
    {
        var query = _context.Foods.AsNoTracking();

        var totalItems = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<FoodDto>
        {
            TotalItems = totalItems,
            Page = page,
            PageSize = pageSize,
            Data = items.ConvertAll(f => new FoodDto
            {
                Id = f.Id,
                Name = f.Name,
                Description = f.Description,
                Carbs = f.Carbs,
                Protein = f.Protein,
                Fat = f.Fat,
                Calories = f.Calories
            })
        };
    }
    
    public async Task<IEnumerable<SelectItemDto>> GetOptionsAsync()
    {
        var query = _context.Foods
            .Select(u => new SelectItemDto
            {
                label = u.Name!,
                value = u.Id
            });

        return await query.ToListAsync();
    }
    
    public async Task<FoodDto?> GetByIdAsync(Guid id)
    {
        var food = await _context.Foods
            .FirstOrDefaultAsync(u => u.Id == id);

        if(food == null)
        {
            throw new KeyNotFoundException();
        }
        
        return new FoodDto
        {
            Id = food.Id,
            Name = food.Name,
            Description = food.Description,
            Carbs = food.Carbs,
            Protein = food.Protein,
            Fat = food.Fat,
            Calories = food.Calories
        };
    }

    public async Task<FoodDto> CreateAsync(FoodDto foodDto)
    {
        var food = new Food
        {
            Name = foodDto.Name,
            Description = foodDto.Description,
            Carbs = foodDto.Carbs,
            Protein = foodDto.Protein,
            Fat = foodDto.Fat,
            Calories = foodDto.Calories,
        };
        
        await _context.Foods.AddAsync(food);
        await _context.SaveChangesAsync();
        
        return new FoodDto
        {
            Id = food.Id,
            Name = food.Name,
            Description = food.Description,
            Carbs = food.Carbs,
            Protein = food.Protein,
            Calories = food.Calories,
            Fat = food.Fat,
        };
    }

    public async Task<FoodDto> UpdateAsync(FoodDto foodDto)
    {
        if (foodDto.Id == null)
        {
            throw new KeyNotFoundException();
        }
        
        var food = await _context.Foods.FirstOrDefaultAsync(u => u.Id == foodDto.Id);

        if (food == null)
        {
            throw new KeyNotFoundException();
        }
        
        food.Name = foodDto.Name;
        food.Description = foodDto.Description;
        food.Carbs = foodDto.Carbs;
        food.Protein = foodDto.Protein;
        food.Calories = foodDto.Calories;
        food.Fat = foodDto.Fat;
        
        await _context.SaveChangesAsync();

        return new FoodDto
        {
            Id = food.Id,
            Name = food.Name,
            Description = food.Description,
            Carbs = food.Carbs,
            Protein = food.Protein,
            Calories = food.Calories,
            Fat = food.Fat
        };
    }

    public async Task DeleteAsync(Guid id)
    {
        var food = await _context.Foods.FindAsync(id);

        if (food != null)
        {
            _context.Foods.Remove(food);
            await _context.SaveChangesAsync();
        }
    }
}