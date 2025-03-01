using System.Text.Json.Serialization;
using Coacher.Backend.Domain.Entities.EntityTypeConfigurations;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Domain.Entities
{
    [EntityTypeConfiguration(typeof(UserEntityTypeConfiguration))]
    public class User : BaseEntity
    {
        public Guid Id { get; init; }
        public string Username { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        [JsonIgnore]
        public string PasswordHash { get; set; } = string.Empty;
        public string Weight { get; set; } = string.Empty;
        public string Height { get; set; } = string.Empty;
        public Guid RoleId { get; set; }
        public virtual Role Role { get; set; } = null!;
        public virtual ICollection<UserPermission> UserPermissions { get; set; } = new List<UserPermission>();
        public virtual ICollection<WorkoutPlan> WorkoutPlans { get; init; } = new List<WorkoutPlan>();
        public virtual ICollection<Diet> Diets { get; init; } = new List<Diet>();
        [JsonIgnore]
        public string? RefreshToken { get; set; }
        [JsonIgnore]
        public DateTime? RefreshTokenExpiryTime { get; set; }
    }
}