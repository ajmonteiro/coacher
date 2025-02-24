using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Entities;

namespace Coacher.Backend.Application.Services.ExerciseService;
public interface IExerciseService
{
      Task<PagedResult<Exercise>> GetAllAsync(int page = 1, int perPage = 10);
      Task<IEnumerable<SelectItemDto>> GetOptionsAsync();
      Task<Exercise?> GetByIdAsync(Guid id);
      Task<Exercise> CreateAsync(ExerciseDto exercise);
      Task<Exercise> UpdateAsync(ExerciseDto exercise);
      Task DeleteAsync(Guid id);
}