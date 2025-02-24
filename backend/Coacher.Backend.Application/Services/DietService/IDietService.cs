using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Entities;

namespace Coacher.Backend.Application.Services.DietService;

public interface IDietService
{
        Task<PagedResult<Diet>> GetAllAsync(int page = 1, int perPage = 10);
        Task<DietDto> GetDietAsync(Guid id);
        Task<DietDto> CreateDietAsync(DietDto createDietDto);
        Task<DietDto> UpdateDietAsync(DietDto updateDietDto);
        Task DeleteDietAsync(Guid id);
}