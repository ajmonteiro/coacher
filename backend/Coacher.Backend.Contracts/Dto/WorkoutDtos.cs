namespace Coacher.Backend.Contracts.Dto
{
    public class WorkoutExerciseDto
    {
        public Guid Id { get; set; }
        public Guid WorkoutId { get; set; }
        public ExerciseDto Exercise { get; set; } = new ExerciseDto();
        public string Name { get; set; } = string.Empty;
        public int PrescribedSets  { get; set; } = 0;
        public int PrescribedReps { get; set; } = 0;
        public int? ActualSets { get; set; }
        public int? ActualReps { get; set; }
        public float? ActualWeight { get; set; }
        public DateTime? CompletedAt { get; set; }
        public string Notes { get; set; } = string.Empty;
    }
    public class WorkoutDto
    {
        public Guid Id { get; set; }
        public Guid WorkoutPlanId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string WeekDay { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public UserDto? User { get; set; }
        public virtual ICollection<WorkoutExerciseDto> Exercises { get; set; } = new List<WorkoutExerciseDto>();
    }
}