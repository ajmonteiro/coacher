namespace backend.Models;

public class UserPermissionDto
{
    public bool CanViewClients { get; set; }
    public bool CanViewDashboard { get; set; }
    public bool CanViewDiets { get; set; }
    public bool CanViewExercises { get; set; }
    public bool CanViewFood { get; set; }
    public bool CanViewMeals { get; set; }
    public bool CanViewWorkouts { get; set; }
}