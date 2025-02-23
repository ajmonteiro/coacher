namespace Coacher.Backend.Contracts.Dto;

public class WorkoutPlanDto
{
    public Guid? Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public ICollection<WorkoutDto> Workouts { get; set; } = new List<WorkoutDto>();
}