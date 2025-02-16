using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Entities
{
    public class Diet
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        [MaxLength(64)]
        public string Name { get; set; } = string.Empty;
        [MaxLength(128)]
        public string? Description { get; set; }
        public virtual ICollection<Meal> Meals { get; set; } = new List<Meal>();
        public virtual ICollection<DietMeal> DietMeals { get; set; } = new List<DietMeal>();
    }
}