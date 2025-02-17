using System.Text.Json.Serialization;

namespace backend.Entities;

public class SetRecord : BaseEntity
{
    public Guid Id { get; set; }
    public Guid WorkoutExerciseId { get; set; }
    public WorkoutExercise WorkoutExercise { get; set; } = null!;

    public Guid UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; } = null!;

    public int Reps { get; set; }
    public int Weight { get; set; }
}