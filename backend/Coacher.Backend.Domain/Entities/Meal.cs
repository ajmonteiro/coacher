using System.Text.Json.Serialization;

namespace Coacher.Backend.Domain.Entities
{
    public class Meal : BaseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public Guid DietId { get; set; }
        [JsonIgnore]
        public Diet? Diet { get; set; }
        public virtual ICollection<MealFood> MealFoods { get; set; } = new List<MealFood>();
    }
}