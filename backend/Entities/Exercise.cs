using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class Exercise : BaseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Video { get; set; }
        [JsonIgnore]
        public virtual ICollection<WorkoutExercise> WorkoutExercises { get; set; } = new List<WorkoutExercise>();
    }
}