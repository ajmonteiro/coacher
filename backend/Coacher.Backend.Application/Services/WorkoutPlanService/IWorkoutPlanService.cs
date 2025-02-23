using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Entities;

namespace Coacher.Backend.Application.Services.WorkoutPlanService
{
       public interface IWorkoutPlanService
       {
           Task<PagedResult<WorkoutPlan>> GetAllWorkoutPlansAsync(int page = 1, int pageSize = 10);
            Task<WorkoutPlan> GetWorkoutPlanAsync(Guid id);
            Task<WorkoutPlan> CreateWorkoutPlanAsync(WorkoutPlanDto workoutPlanDto);
            Task<WorkoutPlan> UpdateWorkoutPlanAsync(WorkoutPlanDto workoutPlanDto);
            Task DeleteWorkoutPlanAsync(Guid id);
        }
}