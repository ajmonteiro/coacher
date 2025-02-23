using System.Text.Json.Serialization;

namespace Coacher.Backend.Domain.Entities;

public abstract class BaseEntity
{
    [JsonIgnore]
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    [JsonIgnore]
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
}