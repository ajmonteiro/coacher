namespace backend.Models;

public class WorkoutResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string WeekDay { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public List<ExerciseInWorkoutDto> Exercises { get; set; } = new();
}

public class ExerciseInWorkoutDto
{
    public Guid ExerciseId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Sets { get; set; }
    public int Reps { get; set; }
}

public class WorkoutCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string WeekDay { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public List<WorkoutExerciseDto> Exercises { get; set; } = new();
}

public class WorkoutExerciseDto
{
    public Guid ExerciseId { get; set; }
    public int Sets { get; set; }
    public int Reps { get; set; }
}

public class WorkoutDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string WeekDay { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public List<ExerciseInWorkoutDto> Exercises { get; set; } = new();
}