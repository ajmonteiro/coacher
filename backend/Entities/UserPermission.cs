using System.Text.Json.Serialization;

namespace backend.Entities;

public class UserPermission
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; } = null!;

    public Guid PermissionId { get; set; }
    [JsonIgnore]
    public Permission Permission { get; set; } = null!;
}
