using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Entities;

namespace Coacher.Backend.Application.Services.MealService;

public interface IMealService
{
    Task<PagedResult<Meal>> GetAllAsync(int page = 1, int perPage = 10);
    Task<Meal?> GetByIdAsync(Guid id);
    Task<Meal> CreateAsync(MealDto exercise);
    Task<Meal> UpdateAsync(MealDto exercise);
    Task DeleteAsync(Guid id);
}