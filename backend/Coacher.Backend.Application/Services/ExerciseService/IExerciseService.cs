using Coacher.Backend.Contracts.Dto;

namespace Coacher.Backend.Application.Services.ExerciseService;
public interface IExerciseService
{
      Task<PagedResult<ExerciseDto>> GetAllAsync(int page = 1, int perPage = 10);
      Task<IEnumerable<SelectItemDto>> GetOptionsAsync();
      Task<ExerciseDto?> GetByIdAsync(Guid id);
      Task<ExerciseDto> CreateAsync(ExerciseDto exercise);
      Task<ExerciseDto> UpdateAsync(ExerciseDto exercise);
      Task DeleteAsync(Guid id);
}