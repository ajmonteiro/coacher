using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Coacher.Backend.Domain.Entities
{
    public class WorkoutPlan : BaseEntity
    {
        public Guid Id { get; set; }
        [Required, MaxLength(64)]
        public string Name { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; } = null!;
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public List<Workout> Workouts { get; set; } = new();
    }
}