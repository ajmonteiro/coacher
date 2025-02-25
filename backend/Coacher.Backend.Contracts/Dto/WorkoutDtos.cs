using System.ComponentModel.DataAnnotations;

namespace Coacher.Backend.Contracts.Dto
{
    public class WorkoutExerciseDto
    {
        public Guid Id { get; set; }
        public Guid WorkoutId { get; set; }
        public ExerciseDto Exercise { get; set; } = new ExerciseDto();
    }
    public class ExerciseInWorkoutDto
    {
        public Guid? Id { get; set; }
        public Guid ExerciseId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Sets  { get; set; }
        public int Reps { get; set; }
    }
    public class WorkoutDto
    {
        public Guid Id { get; set; }
        public Guid WorkoutPlanId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string WeekDay { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public UserDto? User { get; set; }
        public virtual ICollection<ExerciseInWorkoutDto> Exercises { get; set; } = new List<ExerciseInWorkoutDto>();
    }
}