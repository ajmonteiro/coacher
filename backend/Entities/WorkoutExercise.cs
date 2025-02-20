using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class WorkoutExercise : BaseEntity
    {
        public Guid Id { get; set; }
        public Guid WorkoutId { get; set; }
        [JsonIgnore]
        public Workout Workout { get; set; } = null!;
        public Guid ExerciseId { get; set; }
        [JsonIgnore]
        public Exercise Exercise { get; set; } = null!;
        public virtual ICollection<Set> Sets { get; set; } = new List<Set>();
    }
}