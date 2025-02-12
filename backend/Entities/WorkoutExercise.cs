using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Entities
{
    [PrimaryKey(nameof(WorkoutId), nameof(ExerciseId))]
    public class WorkoutExercise
    {
        public int WorkoutId { get; set; }
        [JsonIgnore]
        public Workout Workout { get; set; } = null!;
        public int ExerciseId { get; set; }
        [JsonIgnore]
        public Exercise Exercise { get; set; } = null!;
        public int Sets { get; set; }
        public int Reps { get; set; }
    }
}