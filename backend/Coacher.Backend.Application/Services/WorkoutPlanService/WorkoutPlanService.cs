using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Data;
using Coacher.Backend.Domain.Entities;
using Coacher.Backend.Domain.Entities.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Application.Services.WorkoutPlanService
{
    public class WorkoutPlanService : IWorkoutPlanService
    {
        private readonly CoacherContext _context;

        public WorkoutPlanService(CoacherContext context)
        {
            _context = context;
        }

        public async Task<PagedResult<WorkoutPlan>> GetAllWorkoutPlansAsync(int page = 1, int perPage = 10)
        {
            var query = _context.WorkoutPlans.IncludeBasic();
            
            var totalItems = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .ToListAsync();

            return new PagedResult<WorkoutPlan>
            {
                TotalItems = totalItems,
                Page = page,
                PerPage = perPage,
                Data = items
            };
        }

        public async Task<WorkoutPlan> GetWorkoutPlanAsync(Guid id)
        {
            var workoutPlan = await _context.WorkoutPlans.IncludeAll().FirstOrDefaultAsync(wp => wp.Id == id);
            
            if(workoutPlan == null) throw new KeyNotFoundException();
            
            return workoutPlan;
        }

        public async Task<WorkoutPlan> CreateWorkoutPlanAsync(WorkoutPlanDto workoutPlanDto)
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

                foreach (var workoutDto in workoutPlanDto.Workouts ?? Enumerable.Empty<WorkoutDto>())
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
                    _context.Entry(workout).State = EntityState.Added;
                    _context.Entry(plan).Collection(p => p.Workouts).IsLoaded = true;

                    if (workoutDto.Exercises != null)
                    {
                        foreach (var exerciseDto in workoutDto.Exercises)
                        {
                            var exercise = await _context.Exercises.FindAsync(exerciseDto.Exercise.Id);
                            if (exercise == null)
                            {
                                throw new Exception($"Exercise with ID {exerciseDto.Exercise.Id} not found");
                            }

                            var workoutExercise = new WorkoutExercise
                            {
                                Id = Guid.NewGuid(),
                                ExerciseId = exercise.Id,
                                Exercise = exercise,
                                WorkoutId = workout.Id,
                                Workout = workout,
                                PrescribedReps = exerciseDto.PrescribedReps,
                                PrescribedSets = exerciseDto.PrescribedSets,
                                ActualWeight = exerciseDto.ActualWeight,
                                ActualReps = exerciseDto.ActualReps,
                                ActualSets = exerciseDto.ActualSets,
                                CompletedAt = exerciseDto.CompletedAt,
                                Notes = exerciseDto.Notes
                            };

                            _context.WorkoutExercises.Add(workoutExercise);
                            _context.Entry(workoutExercise).State = EntityState.Added;

                            exercise.WorkoutExercises.Add(workoutExercise);
                            workout.WorkoutExercises.Add(workoutExercise);
                        }
                    }
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return plan;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception($"Error creating workout plan: {ex.Message}", ex);
            }
        }

        public async Task<WorkoutPlan> UpdateWorkoutPlanAsync(WorkoutPlanDto workoutPlanDto)
        {
            var plan = await _context.WorkoutPlans
                .IncludeBasic()
                .FirstOrDefaultAsync(wp => wp.Id == workoutPlanDto.Id);

            if (plan == null) throw new KeyNotFoundException();

            plan.Name = workoutPlanDto.Name;
            plan.StartDate = workoutPlanDto.StartDate;
            plan.EndDate = workoutPlanDto.EndDate;

            foreach (var workoutDto in workoutPlanDto.Workouts ?? Enumerable.Empty<WorkoutDto>())
            {
                var existingWorkout = plan.Workouts.FirstOrDefault(w => w.Id == workoutDto.Id);
                if (existingWorkout != null)
                {
                    existingWorkout.Name = workoutDto.Name;
                    existingWorkout.Description = workoutDto.Description;
                    existingWorkout.WeekDay = workoutDto.WeekDay;
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
                            Id = Guid.NewGuid(),
                            ExerciseId = e.Exercise.Id,
                            PrescribedReps = e.PrescribedReps,
                            PrescribedSets = e.PrescribedSets,
                            ActualWeight = e.ActualWeight,
                            ActualReps = e.ActualReps,
                            ActualSets = e.ActualSets,
                            CompletedAt = e.CompletedAt,
                            Notes = e.Notes
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
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var plan = await _context.WorkoutPlans
                    .Include(p => p.Workouts)
                    .ThenInclude(w => w.WorkoutExercises)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (plan == null)
                    throw new Exception("Workout plan not found");

                foreach (var workout in plan.Workouts)
                {
                    _context.WorkoutExercises.RemoveRange(workout.WorkoutExercises);
                }

                _context.Workouts.RemoveRange(plan.Workouts);

                _context.WorkoutPlans.Remove(plan);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception($"Error deleting workout plan: {ex.Message}", ex);
            }
        }
    }
}