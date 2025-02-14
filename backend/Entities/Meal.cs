using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class Meal
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public ICollection<Food> FoodIds { get; set; }= new List<Food>();
        public Guid DietId { get; set; }
        [JsonIgnore]
        public Diet? Diet { get; set; }
        public virtual ICollection<MealFood> MealFoods { get; set; } = new List<MealFood>();

    }
}