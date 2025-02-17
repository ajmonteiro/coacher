using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class WorkoutExercise : BaseEntity
    {
        public Guid Id { get; set; }
        public Guid WorkoutId { get; init; }
        [JsonIgnore]
        public Workout Workout { get; init; } = null!;
        public Guid ExerciseId { get; init; }
        [JsonIgnore]
        public Exercise Exercise { get; init; } = null!;
        public int Set { get; set; }
        public int Reps { get; set; }
    }
}