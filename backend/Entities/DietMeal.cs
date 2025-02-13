using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Entities
{
    [PrimaryKey(nameof(DietId), nameof(MealId))]
    public class DietMeal
    {
        public int DietId { get; set; }
        [JsonIgnore]
        public Diet Diet { get; set; } = null!;
        public int MealId { get; set; }
        [JsonIgnore]
        public Meal Meal { get; set; } = null!;
    }
}