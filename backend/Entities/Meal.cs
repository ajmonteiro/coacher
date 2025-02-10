using System.Text.Json.Serialization;

namespace Coacher.Entities
{
    public class Meal
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public ICollection<int> FoodIds { get; set; } = new List<int>();
        public int DietId { get; set; }
        [JsonIgnore]
        public Diet? Diet { get; set; }
    }
}