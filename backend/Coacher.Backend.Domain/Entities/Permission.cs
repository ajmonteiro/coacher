using System.ComponentModel.DataAnnotations;

namespace Coacher.Backend.Domain.Entities
{
    public class Permission : BaseEntity
    {
        public Guid Id { get; set; }
        [MaxLength(64)]
        public string Name { get; set; } = string.Empty;
        public ICollection<Role> Roles { get; set; } = new List<Role>();
        public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    }
}