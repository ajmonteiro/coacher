namespace backend.Models
{
    public class SetRecordDto
    {
        public Guid? Id { get; set; }
        public Guid WorkoutExerciseId { get; set; }
        public int Reps { get; set; }
        public int Weight { get; set; }
        public Guid UserId { get; set; }
        public Guid SetId { get; set; }
    }
}