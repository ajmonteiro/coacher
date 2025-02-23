namespace Coacher.Backend.Contracts.Dto;

public class MealDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid DietId { get; set; }
    public string? Description { get; set; }
    public List<MealFoodDto> MealFoods { get; set; } = new List<MealFoodDto>();
}

public class MealFoodDto
{
    public Guid? Id { get; set; }
    public Guid FoodId { get; set; }
    public int Quantity { get; set; }
    public string Unit { get; set; } = null!;
    public double? Calories { get; set; }
    public double? Protein { get; set; }
    public double? Fat { get; set; }
    public double? Carbs { get; set; }
}

