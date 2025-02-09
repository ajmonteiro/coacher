using System.Text.Json.Serialization;

namespace Coacher.Entities
{
    public class Diet
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }  
        public required string Name { get; set; }
        public string? Description { get; set; }
        public ICollection<Meal> Meals { get; set; } = new List<Meal>();
    }
}