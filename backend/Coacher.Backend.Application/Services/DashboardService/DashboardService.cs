using Coacher.Backend.Application.Services.DashboardService;
using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Data;
using Microsoft.EntityFrameworkCore;

public class DashboardService : IDashboardService
{
    private readonly CoacherContext _context;

    public DashboardService(CoacherContext context)
    {
        _context = context;
    }

    public async Task<DashboardDto> GetDashboardAsync()
    {
        var UserCount = await _context.Users.AsNoTracking().CountAsync();
        var FoodCount = await _context.Foods.AsNoTracking().CountAsync();
        var ExerciseCount = await _context.Exercises.AsNoTracking().CountAsync();
        var WorkoutPlanCount = await _context.WorkoutPlans.AsNoTracking().CountAsync();
        var users = await _context.Users.ToListAsync();

        return new DashboardDto
        {
            UserCount = UserCount,
            FoodCount = FoodCount,
            ExerciseCount = ExerciseCount,
            WorkoutPlanCount = WorkoutPlanCount,
            Users = users.Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                FullName = u.FullName,
                Phone = u.Phone,
                Weight = u.Weight,
                Height = u.Height,
                RoleId = u.RoleId,
                RoleName = u.Role.Name
            }).ToList()
        };
    }
}