namespace backend.Entities
{
    public class Workout : BaseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string WeekDay { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public virtual ICollection<WorkoutExercise> WorkoutExercises { get; set; } = new List<WorkoutExercise>();

        public virtual ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
    }
}