using System.Text.Json.Serialization;

namespace backend.Entities;

public class Set : BaseEntity
{
    public Guid Id { get; set; }
    public int Reps { get; set; }
    public Guid ExerciseId { get; set; }
    [JsonIgnore]
    public Exercise Exercise { get; set; } = null!;
}