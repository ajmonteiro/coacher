namespace backend.Entities
{
    public class Workout
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string WeekDay { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public virtual ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
        public virtual List<WorkoutExercise> WorkoutExercises { get; set; } = new();
    }
}