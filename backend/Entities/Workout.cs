using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class Workout : BaseEntity
    {
        public Guid Id { get; set; }
        [JsonIgnore]
        public Guid WorkoutPlanId { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;
        [Required]
        [MaxLength(20)]
        public string WeekDay { get; set; } = string.Empty;
        [Required]
        [JsonIgnore]
        public WorkoutPlan WorkoutPlan { get; set; } = new();
        public virtual ICollection<WorkoutExercise> WorkoutExercises { get; set; } = new List<WorkoutExercise>();
    }
}