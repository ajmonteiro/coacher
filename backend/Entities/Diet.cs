using System.Text.Json.Serialization;

namespace Coacher.Entities
{
    public class Diet
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}