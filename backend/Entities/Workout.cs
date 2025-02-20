using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class Workout : BaseEntity
    {
        public Guid Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;
        [Required]
        [MaxLength(20)]
        public string WeekDay { get; set; } = string.Empty;
        [Required]
        public Guid WorkoutPlanId { get; set; }
        [JsonIgnore]
        public WorkoutPlan WorkoutPlan { get; set; } = new();
        [JsonIgnore]
        public ICollection<WorkoutExercise> WorkoutExercises { get; set; } = new List<WorkoutExercise>();
    }
}