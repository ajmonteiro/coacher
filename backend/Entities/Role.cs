using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class Role
    {
        public Guid Id { get; init; }
        [MaxLength(24)]
        public string Name { get; init; } = string.Empty;
        [JsonIgnore]
        public virtual ICollection<User> Users { get; init; } = new List<User>();
        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}