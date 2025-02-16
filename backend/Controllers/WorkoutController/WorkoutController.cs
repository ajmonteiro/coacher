using backend.Models;
using backend.Entities;
using backend.Data;
using backend.Services.AuthService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Permission = backend.Services.AuthService.Permission;

namespace backend.Controllers.WorkoutController
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController(AppDbContext context) : ControllerBase
    {
        public Workout Workout { get; set; } = new Workout();

        [Authorize(Roles = "Coach")]
        [HttpGet]
        [HasPermission(Permission.ReadWorkout)]
        public async Task<ActionResult<object>> GetWorkouts(int page = 1, int perPage = 10)
        {
            if (page < 1 || perPage < 1)
                return BadRequest("Page and perPage must be greater than 0.");

            var totalItems = await context.Workouts.CountAsync();

            var workoutsWithExercises = await context.Workouts
                .Include(w => w.WorkoutExercises)
                    .ThenInclude(we => we.Exercise)
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .Select(w => new
                {
                    w.Id,
                    w.Name,
                    w.Description,
                    w.User,
                    exercises = w.WorkoutExercises.Select(we => new
                    {
                        we.Exercise.Id,
                        we.Exercise.Name,
                        we.Exercise.Description,
                        we.Exercise.Video,
                        we.Sets,
                        we.Reps
                    }).ToList()
                })
                .ToListAsync();


            return Ok(new
            {
                TotalItems = totalItems,
                PerPage = perPage,
                Page = page,
                Data = workoutsWithExercises
            });
        }


        [Authorize]
        [HttpGet("{id}")]
        [HasPermission(Permission.ReadWorkout)]
        public ActionResult<Workout> GetWorkout(int id)
        {
            var Workout = context.Workouts.Find(id);
            if (Workout is null)
                return NotFound();
            return Workout;
        }

        [Authorize(Roles = "Coach")]
        [HttpPost]
        [HasPermission(Permission.CreateWorkout)]
        public async Task<ActionResult<WorkoutResponseDto>> CreateWorkout(WorkoutCreateDto workoutDto)
        {
            var workout = new Workout
            {
                Name = workoutDto.Name,
                Description = workoutDto.Description,
                UserId = workoutDto.UserId,
                WeekDay = workoutDto.WeekDay,
            };

            using var transaction = context.Database.BeginTransaction();

            context.Workouts.Add(workout);
            await context.SaveChangesAsync();

            foreach (var exercise in workoutDto.Exercises)
            {
                var existingWorkoutExercise = await context.WorkoutExercises.FirstOrDefaultAsync(we =>
                    we.WorkoutId == workout.Id && we.ExerciseId == exercise.ExerciseId);

                if (existingWorkoutExercise == null)
                {
                    var workoutExercise = new WorkoutExercise
                    {
                        WorkoutId = workout.Id,
                        ExerciseId = exercise.ExerciseId,
                        Sets = exercise.Sets,
                        Reps = exercise.Reps
                    };
                    context.WorkoutExercises.Add(workoutExercise);
                }
                else
                {
                    existingWorkoutExercise.Sets = exercise.Sets;
                    existingWorkoutExercise.Reps = exercise.Reps;
                    context.WorkoutExercises.Update(existingWorkoutExercise);
                }
            }

            await context.SaveChangesAsync();
            await transaction.CommitAsync();

            var workoutResponse = new WorkoutResponseDto
            {
                Id = workout.Id,
                Name = workout.Name,
                Description = workout.Description,
                UserId = workout.UserId,
                WeekDay = workout.WeekDay,
                Exercises = context.WorkoutExercises
                    .Include(we => we.Exercise)
                    .Where(we => we.WorkoutId == workout.Id)
                    .Select(we => new ExerciseInWorkoutDto
                    {
                        ExerciseId = we.ExerciseId,
                        Name = we.Exercise.Name,
                        Sets = we.Sets,
                        Reps = we.Reps
                    }).ToList()
            };

            return Ok(workoutResponse);
        }

        [Authorize(Roles = "Coach")]
        [HttpPut("{id}")]
        [HasPermission(Permission.EditWorkout)]
        public async Task<ActionResult<Workout>> UpdateWorkout(Guid id, Workout Workout)
        {
            if (id != Workout.Id)
                return BadRequest();
            context.Entry(Workout).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(Workout);
        }

        [Authorize(Roles = "Coach")]
        [HttpDelete("{id}")]
        [HasPermission(Permission.DeleteWorkout)]
        public async Task<ActionResult<Workout>> DeleteWorkout(Guid id)
        {
            var Workout = context.Workouts.Find(id);
            if (Workout is null)
                return NotFound();
            context.Workouts.Remove(Workout);
            await context.SaveChangesAsync();
            return Ok(Workout);
        }
    }
}