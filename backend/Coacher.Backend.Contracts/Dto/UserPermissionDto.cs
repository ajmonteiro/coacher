using System.Text.Json.Serialization;

namespace Coacher.Backend.Contracts.Dto
{
  public class UserPermissionDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        [JsonIgnore]
        public UserDto User { get; set; } = null!;
        public Guid PermissionId { get; set; }
        [JsonIgnore]
        public PermissionDto Permission { get; set; } = null!;
        public string PermissionName => Permission?.Name ?? string.Empty;
    }
}