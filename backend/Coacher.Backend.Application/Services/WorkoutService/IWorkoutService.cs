using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Entities;

namespace Coacher.Backend.Application.Services.WorkoutService;

public interface IWorkoutService
{
    Task<WorkoutDto> GetWorkoutAsync(Guid id);
    Task<PagedResult<Workout>> GetAllWorkoutsAsync(int page = 1, int perPage = 10);
    Task<Workout> UpdateWorkoutAsync(WorkoutDto workout);
    Task DeleteWorkoutAsync(Guid id);
}