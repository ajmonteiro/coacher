using backend.Models;
using backend.Entities;
using backend.Data;
using backend.Entities.Extensions;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.WorkoutPlanService
{
    public class WorkoutPlanService : IWorkoutPlanService
    {
        private readonly AppDbContext _context;

        public WorkoutPlanService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PagedResult<WorkoutPlan>> GetAllWorkoutPlansAsync(int page = 1, int pageSize = 10)
        {
            var query = _context.WorkoutPlans.IncludeBasic();
            
            var totalItems = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<WorkoutPlan>
            {
                TotalItems = totalItems,
                Page = page,
                PageSize = pageSize,
                Data = items
            };
        }

        public async Task<WorkoutPlan> GetWorkoutPlanAsync(Guid id)
        {
            return await _context.WorkoutPlans
                .IncludeBasic()
                .FirstOrDefaultAsync(wp => wp.Id == id);
        }

       public async Task<WorkoutPlan> CreateWorkoutPlanAsync(WorkoutPlanCreateDto workoutPlanDto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var plan = new WorkoutPlan
                {
                    Id = Guid.NewGuid(),
                    Name = workoutPlanDto.Name,
                    UserId = workoutPlanDto.UserId,
                    StartDate = workoutPlanDto.StartDate,
                    EndDate = workoutPlanDto.EndDate
                };
                
                _context.WorkoutPlans.Add(plan);
                await _context.SaveChangesAsync();

                foreach (var workoutDto in workoutPlanDto.Workouts ?? Enumerable.Empty<WorkoutCreateDto>())
                {
                    var workout = new Workout
                    {
                        Id = Guid.NewGuid(),
                        Name = workoutDto.Name,
                        Description = workoutDto.Description,
                        WeekDay = workoutDto.WeekDay,
                        WorkoutPlanId = plan.Id
                    };

                    plan.Workouts.Add(workout);
                    
                    _context.Workouts.Add(workout);
                    
                    foreach (var exerciseDto in workoutDto.Exercises ?? Enumerable.Empty<ExerciseInWorkoutCreateDto>())
                    {
                        var exercise = await _context.Exercises.FindAsync(exerciseDto.ExerciseId);
                        if (exercise == null)
                        {
                            throw new Exception($"Exercise with ID {exerciseDto.ExerciseId} not found");
                        }

                        var workoutExercise = new WorkoutExercise
                        {
                            Id = Guid.NewGuid(),
                            ExerciseId = exercise.Id,
                            WorkoutId = workout.Id,
                            Sets = exerciseDto.Sets.Select(s => new Set
                            {
                                Id = Guid.NewGuid(),
                                Reps = s.Reps,
                                ExerciseId = exercise.Id
                            }).ToList()
                        };
                        
                        _context.WorkoutExercises.Add(workoutExercise);
                    }
                    
                    await _context.SaveChangesAsync();
                }

                await transaction.CommitAsync();
                return plan;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception($"Error creating workout plan: {ex.Message}", ex);
            }
        }

        public async Task<WorkoutPlan> UpdateWorkoutPlanAsync(WorkoutPlanUpdateDto workoutPlanDto)
        {
            var plan = await _context.WorkoutPlans
                .IncludeBasic()
                .FirstOrDefaultAsync(wp => wp.Id == workoutPlanDto.Id);

            if (plan == null) throw new KeyNotFoundException();

            plan.Name = workoutPlanDto.Name;
            plan.StartDate = workoutPlanDto.StartDate;
            plan.EndDate = workoutPlanDto.EndDate;

            foreach (var workoutDto in workoutPlanDto.Workouts ?? Enumerable.Empty<WorkoutUpdateDto>())
            {
                var existingWorkout = plan.Workouts.FirstOrDefault(w => w.Id == workoutDto.Id);
                if (existingWorkout != null)
                {
                    existingWorkout.Name = workoutDto.Name;
                    existingWorkout.Description = workoutDto.Description;
                    existingWorkout.WeekDay = workoutDto.WeekDay;

                    foreach (var exerciseDto in workoutDto.Exercises ?? Enumerable.Empty<ExerciseInWorkoutUpdateDto>())
                    {
                        var existingExercise = existingWorkout.WorkoutExercises
                            .FirstOrDefault(we => we.Id == exerciseDto.Id);

                        if (existingExercise != null)
                        {
                            existingExercise.Sets = exerciseDto.Sets.Select(s => new Set
                            {
                                Id = s.Id,
                                Reps = s.Reps
                            }).ToList();
                        }
                    }
                }
                else
                {
                    var newWorkout = new Workout
                    {
                        Id = Guid.NewGuid(),
                        Name = workoutDto.Name,
                        Description = workoutDto.Description,
                        WeekDay = workoutDto.WeekDay,
                        WorkoutPlanId = plan.Id,
                        WorkoutExercises = workoutDto.Exercises.Select(e => new WorkoutExercise
                        {
                            ExerciseId = e.ExerciseId,
                            Sets = e.Sets.Select(s => new Set
                            {
                                Id = s.Id,
                                Reps = s.Reps
                            }).ToList()
                        }).ToList()
                    };

                    plan.Workouts.Add(newWorkout);
                }
            }

            await _context.SaveChangesAsync();
            return plan;
        }
        
        public async Task DeleteWorkoutPlanAsync(Guid id)
        {
            var plan = await _context.WorkoutPlans.FindAsync(id);
            if (plan != null)
            {
                _context.WorkoutPlans.Remove(plan);
                await _context.SaveChangesAsync();
            }
        }
    }
}