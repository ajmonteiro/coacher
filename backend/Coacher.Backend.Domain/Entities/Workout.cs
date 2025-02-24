using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Coacher.Backend.Domain.Entities
{
    public class Workout : BaseEntity
    {
        public Guid Id { get; set; }
        public Guid WorkoutPlanId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string WeekDay { get; set; } = string.Empty;
        [JsonIgnore]
        public WorkoutPlan WorkoutPlan { get; set; } = new();
        public virtual ICollection<WorkoutExercise> WorkoutExercises { get; set; } = new List<WorkoutExercise>();
    }
}