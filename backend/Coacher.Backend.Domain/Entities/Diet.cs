using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Coacher.Backend.Domain.Entities
{
    public class Diet : BaseEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public virtual ICollection<Meal> Meals { get; set; } = new List<Meal>();
        public virtual ICollection<DietMeal> DietMeals { get; set; } = new List<DietMeal>();
    }
}