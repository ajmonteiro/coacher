using Coacher.Entities;

namespace Coacher.Models
{
    public class WorkoutResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int UserId { get; set; }
        public List<ExerciseInWorkoutDto> Exercises { get; set; } = new();
    }

    public class ExerciseInWorkoutDto
    {
        public int ExerciseId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Sets { get; set; }
        public int Reps { get; set; }
    }

    public class WorkoutCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int UserId { get; set; }
        public List<WorkoutExerciseDto> Exercises { get; set; } = new();
    }

     public class WorkoutExerciseDto
    {
        public int ExerciseId { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
    }

     public class WorkoutDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int UserId { get; set; } 

        public List<ExerciseInWorkoutDto> Exercises { get; set; } = new();
    }
}