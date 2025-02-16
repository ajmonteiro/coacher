using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Permission
    {
        public Guid Id { get; set; }
        [MaxLength(64)]
        public string Name { get; set; } = string.Empty;
        public ICollection<Role> Roles { get; set; } = new List<Role>();
    }
}