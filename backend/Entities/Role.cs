using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    public class Role
    {
        public Guid Id { get; set; }
        [MaxLength(64)]
        public string Name { get; set; } = string.Empty;
        public ICollection<Permission> Permissions { get; set; } = new List<Permission>();
    }
}
