using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace backend.Entities
{
    [PrimaryKey(nameof(WorkoutId), nameof(ExerciseId))]
    public class WorkoutExercise
    {
        public Guid WorkoutId { get; init; }
        [JsonIgnore]
        public Workout Workout { get; init; } = null!;
        public Guid ExerciseId { get; init; }
        [JsonIgnore]
        public Exercise Exercise { get; init; } = null!;
        public int Sets { get; set; }
        public int Reps { get; set; }
    }
}