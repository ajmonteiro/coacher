using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Domain.Entities;

[PrimaryKey(nameof(RoleId), nameof(PermissionId))]
public class RolePermission : BaseEntity
{
    public Guid RoleId { get; set; }
    [JsonIgnore]
    public Role Role { get; set; } = null!;

    public Guid PermissionId { get; set; }
    [JsonIgnore]
    public Permission Permission { get; set; } = null!;
}
