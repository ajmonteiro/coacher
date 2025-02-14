using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class User 
    {
        public Guid Id { get; init; }
        
        [MaxLength(64)]
        public string Username { get; set; } = string.Empty;
        [MaxLength(128)]
        public string FullName { get; set; } = string.Empty;
        [MaxLength(32)]
        public string Phone { get; set; } = string.Empty;
        [MaxLength(255)]
        [JsonIgnore]
        public string PasswordHash { get; set; } = string.Empty;
        [MaxLength(3)]
        public string Weight { get; set; } = string.Empty;
        [MaxLength(3)]
        public string Height { get; set; } = string.Empty;
        public Guid RoleId { get; set; }
        public virtual Role Role { get; set; } = null!;
        public virtual ICollection<Workout> Workouts { get; init; } = new List<Workout>();

        [JsonIgnore] public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
        public virtual ICollection<Diet> Diets { get; init; } = new List<Diet>();
        [JsonIgnore]
        public string? RefreshToken { get; set; }
        [JsonIgnore]
        public DateTime? RefreshTokenExpiryTime { get; set; }
    }
}