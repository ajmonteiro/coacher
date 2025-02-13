namespace Coacher.Models 
{
    public class UserDto 
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Weight { get; set; } = string.Empty;
        public string Height { get; set; } = string.Empty;
        public string? Role { get; set; } = string.Empty;
        public List<WorkoutDto> Workouts { get; set; } = new();
        public List<DietDto> Diets { get; set; } = new();

    }
}