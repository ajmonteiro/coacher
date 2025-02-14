using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace backend.Entities
{
    [PrimaryKey(nameof(DietId), nameof(MealId))]
    public class DietMeal
    {
        public Guid DietId { get; set; }
        [JsonIgnore]
        public Diet Diet { get; set; } = null!;
        public Guid MealId { get; set; }
        [JsonIgnore]
        public Meal Meal { get; set; } = null!;
        
        public DietMeal()
        {
    
        }
    }
}