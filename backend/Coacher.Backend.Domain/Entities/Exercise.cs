using System.Text.Json.Serialization;
using Coacher.Backend.Domain.Entities.EntityTypeConfigurations;
using Coacher.Backend.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Domain.Entities
{
    [EntityTypeConfiguration(typeof(ExerciseTypeConfiguration))]
    public class Exercise : BaseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public ExerciseType ExerciseType { get; set; } = ExerciseType.Strength;
        public string? Video { get; set; }
        [JsonIgnore]
        public virtual ICollection<WorkoutExercise> WorkoutExercises { get; set; } = new List<WorkoutExercise>();
    }
}