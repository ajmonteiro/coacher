using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class Diet
    {
        public Guid Id { get; init; }
        public Guid UserId { get; init; }
        [JsonIgnore]
        public User? User { get; init; }
        [MaxLength(64)]
        public string Name { get; init; } = string.Empty;
        [MaxLength(128)]
        public string? Description { get; init; }
        public virtual ICollection<Meal> Meals { get; init; } = new List<Meal>();
        public virtual ICollection<DietMeal> DietMeals { get; init; } = new List<DietMeal>();
    }
}