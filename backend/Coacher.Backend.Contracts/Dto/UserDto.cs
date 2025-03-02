namespace Coacher.Backend.Contracts.Dto
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Weight { get; set; } = string.Empty;
        public string Height { get; set; } = string.Empty;
        public Guid RoleId { get; set; }
        public string? RoleName { get; set; } = string.Empty;
        public List<UserPermissionDto>? UserPermissions { get; set; } = new();
        public List<WorkoutPlanDto>? WorkoutPlans { get; set; } = new();
        public List<DietDto>? Diets { get; set; } = new();
    }

  
}