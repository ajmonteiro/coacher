namespace Coacher.Backend.Contracts.Dto
{
    public class DashboardDto
    {
        public int UserCount { get; set; }
        public int FoodCount { get; set; }
        public int ExerciseCount { get; set; }
        public int WorkoutPlanCount { get; set; }
        public ICollection<UserDto> Users { get; set; } = new List<UserDto>();
    }
}