namespace backend.Models;

public class CreateDietDto
{
    public Guid? Id { get; set; }
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public List<CreateMealDto> Meals { get; set; } = new();
}


public class DietDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public List<MealDto> Meals { get; set; } = new();
}