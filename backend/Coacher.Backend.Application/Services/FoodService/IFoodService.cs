using Coacher.Backend.Contracts.Dto;

namespace Coacher.Backend.Application.Services.FoodService;

public interface IFoodService
{
    Task<PagedResult<FoodDto>> GetAllAsync(int page = 1, int perPage = 10);
    Task<FoodDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<SelectItemDto>> GetOptionsAsync();
    Task<FoodDto> CreateAsync(FoodDto foodDto);
    Task<FoodDto> UpdateAsync(FoodDto foodDto);
    Task DeleteAsync(Guid id);
}