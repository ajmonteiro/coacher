using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Coacher.Backend.Domain.Entities
{
    public class Role : BaseEntity
    {
        public Guid Id { get; set; }
        [MaxLength(64)]
        public string Name { get; set; } = string.Empty;
        [JsonIgnore]
        public ICollection<Permission> Permissions { get; set; } = new List<Permission>();
        [JsonIgnore]
        public ICollection<User> Users { get; set; } = new List<User>();
        [JsonIgnore]
        public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();

    }
}
