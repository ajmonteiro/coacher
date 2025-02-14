
using System.Text.Json.Serialization;

namespace backend.Models 
{
    public class UserDto 
    {
        public Guid Id { get; set; }
        public string Username { get; init; } = string.Empty;
        public string FullName { get; init; } = string.Empty;
        public string Phone { get; init; } = string.Empty;
        public string Password { get; init; } = string.Empty;
        public string Weight { get; init; } = string.Empty;
        public string Height { get; init; } = string.Empty;
        public Guid RoleId { get; init; }
        [JsonIgnore]
        public RoleDto Role { get; init; } = new();
        public UserPermissionDto Permissions { get; init; } = new();
        public List<WorkoutDto> Workouts { get; set; } = new();
        public List<DietDto> Diets { get; set; } = new();

    }
}