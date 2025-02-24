namespace Coacher.Backend.Contracts.Dto;

public class FoodDto
{
    public Guid? Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public double Calories { get; set; } = 0;
    public double Protein { get; set; } = 0;
    public double Carbs { get; set; } = 0;
    public double Fat { get; set; } = 0;
}
