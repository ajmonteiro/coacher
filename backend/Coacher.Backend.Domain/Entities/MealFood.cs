using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Domain.Entities
{
    [PrimaryKey(nameof(MealId), nameof(FoodId))]
    public class MealFood : BaseEntity
    {
        public Guid MealId { get; set; }
        [JsonIgnore]
        public Meal Meal { get; set; } = null!;
        public Guid FoodId { get; set; }
        [JsonIgnore]
        public Food Food { get; set; } = null!;
        public int Quantity { get; set; }
        [MaxLength(50)]
        public string Unit { get; set; } = null!;
    }
}