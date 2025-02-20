using backend.Entities;
using backend.Models;

namespace backend.Services.WorkoutPlanService 
{
       public interface IWorkoutPlanService
       {
           Task<PagedResult<WorkoutPlan>> GetAllWorkoutPlansAsync(int page = 1, int pageSize = 10);
            Task<WorkoutPlan> GetWorkoutPlanAsync(Guid id);
            Task<WorkoutPlan> CreateWorkoutPlanAsync(WorkoutPlanCreateDto workoutPlanDto);
            Task<WorkoutPlan> UpdateWorkoutPlanAsync(WorkoutPlanUpdateDto workoutPlanDto);
            Task DeleteWorkoutPlanAsync(Guid id);
        }
}