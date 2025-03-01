using System.Text.Json.Serialization;
using Coacher.Backend.Domain.Entities.EntityTypeConfigurations;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Domain.Entities
{
    [EntityTypeConfiguration(typeof(WorkoutExerciseEntityTypeConfiguration))]
    public class WorkoutExercise : BaseEntity
    {
        public Guid Id { get; set; }
        public Guid WorkoutId { get; set; }
        [JsonIgnore]
        public virtual Workout Workout { get; set; } = null!;
        public Guid ExerciseId { get; set; }
        public virtual Exercise Exercise { get; set; } = null!;
        public int PrescribedSets { get; set; } = 0;
        public int PrescribedReps { get; set; } = 0;
        
        public int? ActualSets { get; set; }
        public int? ActualReps { get; set; }
        public float? ActualWeight { get; set; }
        public DateTime? CompletedAt { get; set; }
        public string Notes { get; set; } = string.Empty;
    }
}