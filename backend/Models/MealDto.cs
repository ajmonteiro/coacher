using System.Text.Json.Serialization;

namespace backend.Models
{
    public class CreateMealDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        [JsonIgnore]
        public Guid DietId { get; set; }
        public List<MealFoodDto> MealFoods { get; set; } = new List<MealFoodDto>();
    }

    public class MealFoodDto
    {
        public Guid FoodId { get; set; }
        public int Quantity { get; set; }
        public string Unit { get; set; } = null!;
        [JsonIgnore]
        public FoodDto Food { get; set; } = null!;
    }   

     public class MealDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        [JsonIgnore]
        public Guid DietId { get; set; }
        public string? Description { get; set; }
        public List<MealFoodDto> MealFoods { get; set; } = new List<MealFoodDto>();
    }

}