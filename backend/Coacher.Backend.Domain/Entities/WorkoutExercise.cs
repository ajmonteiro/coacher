using System.Text.Json.Serialization;

namespace Coacher.Backend.Domain.Entities
{
    public class WorkoutExercise : BaseEntity
    {
        public Guid Id { get; set; }
        public Guid WorkoutId { get; set; }
        [JsonIgnore]
        public virtual Workout Workout { get; set; } = null!;
        
        public Guid ExerciseId { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public virtual Exercise Exercise { get; set; } = null!;
        public int Sets { get; set; } = 0;
        public int Reps { get; set; } = 0;
    }
}