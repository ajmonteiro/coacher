using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace backend.Entities
{
    [PrimaryKey(nameof(MealId), nameof(FoodId))]
    public class MealFood
    {
        public Guid MealId { get; init; }
        [JsonIgnore]
        public Meal Meal { get; init; } = null!;
        public Guid FoodId { get; init; }
        [JsonIgnore]
        public Food Food { get; init; } = null!;
        public int Quantity { get; init; }
        [MaxLength(50)]
        public string Unit { get; init; } = null!;
    }
}