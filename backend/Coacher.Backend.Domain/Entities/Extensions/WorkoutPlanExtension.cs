using Coacher.Backend.Contracts.Dto;

namespace Coacher.Backend.Domain.Entities.Extensions
{
    public static class WorkoutPlanExtensions
    {
        public static Workout ToEntity(this WorkoutDto workoutDto)
        {
            return new Workout
            {
                Id = Guid.NewGuid(),
                Name = workoutDto.Name,
                Description = workoutDto.Description,
                WeekDay = workoutDto.WeekDay,
                WorkoutExercises = workoutDto.Exercises.Select(e => e.ToEntity()).ToList()
            };
        }

        public static Workout UpdateEntity(this WorkoutDto workoutDto, Workout existingWorkout)
        {
            existingWorkout.Name = workoutDto.Name;
            existingWorkout.Description = workoutDto.Description;
            existingWorkout.WeekDay = workoutDto.WeekDay;
            existingWorkout.WorkoutExercises = workoutDto.Exercises.Select(e => e.UpdateEntity(existingWorkout.WorkoutExercises.FirstOrDefault(w => w.Id == e.Id)!)).ToList();
            return existingWorkout;
        }

        public static WorkoutExercise ToEntity(this WorkoutExerciseDto exerciseDto)
        {
            return new WorkoutExercise
            {
                Id = Guid.NewGuid(),
                ExerciseId = exerciseDto.Exercise.Id,
            };
        }
        
        public static WorkoutExercise UpdateEntity(this WorkoutExerciseDto exerciseDto, WorkoutExercise existingExercise)
        {
            if (existingExercise == null)
            {
                throw new ArgumentNullException(nameof(existingExercise));
            }
            
            existingExercise.ExerciseId = exerciseDto.Exercise.Id;
            
            return existingExercise;
        }
    }
}