using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Data;
using Coacher.Backend.Domain.Entities;
using Coacher.Backend.Domain.Entities.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Application.Services.WorkoutService;

public class WorkoutService : IWorkoutService
{
    private readonly CoacherContext _context;

    public WorkoutService(CoacherContext context)
    {
        _context = context;
    }

    public async Task<WorkoutDto> GetWorkoutAsync(Guid id)
    {
        var workout = await _context.Workouts
            .WithExercises()
            .UserIncluded()
            .FirstOrDefaultAsync(w => w.Id == id);

        if(workout != null)
        {
            return new WorkoutDto
            {
                Id = workout.Id,
                Name = workout.Name,
                Description = workout.Description,
                WorkoutPlanId = workout.WorkoutPlanId,
                WeekDay = workout.WeekDay,
                UserId = workout.WorkoutPlan.UserId,
                Exercises = workout.WorkoutExercises.Select(we => new WorkoutExerciseDto
                {
                    Id = we.Id,
                    Exercise = new ExerciseDto
                    {
                        Id = we.Exercise.Id,
                        Name = we.Exercise.Name,
                        Description = we.Exercise.Description,
                        Video = we.Exercise.Video,
                        ExerciseType = (int)we.Exercise.ExerciseType
                    },
                    Name = we.Exercise.Name,
                    PrescribedReps = we.PrescribedReps,
                    PrescribedSets = we.PrescribedSets,
                }).ToList()
            };
        }
        else
        {
            throw new KeyNotFoundException();
        }
    }

    public async Task<PagedResult<Workout>> GetAllWorkoutsAsync(int page = 1, int perPage = 10)
    {
            var query = _context.Workouts.AsNoTracking();
            
            var totalItems = await query.CountAsync();

            var items = await query
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .ToListAsync();
           
            return new PagedResult<Workout>
            {
                TotalItems = totalItems,
                Page = page,
                PerPage = perPage,
                Data = items
            };
    }

    Task<Workout> IWorkoutService.UpdateWorkoutAsync(WorkoutDto workout)
    {
        throw new NotImplementedException();
    }

     Task IWorkoutService.DeleteWorkoutAsync(Guid id)
    {
        throw new NotImplementedException();
    }

}