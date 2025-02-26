namespace Coacher.Backend.Contracts.Dto;

public class ExerciseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = String.Empty;
    public string? Video { get; set; }
    public int? ExerciseType { get; set; } = 0;
}