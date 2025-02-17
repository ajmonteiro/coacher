using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace backend.Entities
{
    [PrimaryKey(nameof(DietId), nameof(MealId))]
    public class DietMeal : BaseEntity

    {
    public Guid DietId { get; set; }
    [JsonIgnore] public Diet Diet { get; set; } = null!;
    public Guid MealId { get; set; }
    [JsonIgnore] public Meal Meal { get; set; } = null!;

    public DietMeal()
    {
    } // Parameterless constructor is important for EF Core
    }
}