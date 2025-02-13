using System.Text.Json.Serialization;

namespace Coacher.Entities
{
    public class User 
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        [JsonIgnore]
        public string PasswordHash { get; set; } = string.Empty;
        public string Weight { get; set; } = string.Empty;
        public string Height { get; set; } = string.Empty;

        public string? Role { get; set; } = string.Empty;
        public virtual ICollection<Workout> Workouts { get; set; } = new List<Workout>();
        public virtual ICollection<Diet> Diets { get; set; } = new List<Diet>();
        [JsonIgnore]
        public string? RefreshToken { get; set; }
        [JsonIgnore]
        public DateTime? RefreshTokenExpiryTime { get; set; }
    }
}