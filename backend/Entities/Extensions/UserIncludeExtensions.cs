using Microsoft.EntityFrameworkCore;

namespace backend.Entities.Extensions;

public static class UserIncludeExtensions
{
    public static IQueryable<User> WithBasicIncludes(this IQueryable<User> query)
    {
        return query
            .Include(u => u.Role)
            .Include(u => u.UserPermissions)
            .ThenInclude(up => up.Permission);
    }

    public static IQueryable<User> WithFitnessData(this IQueryable<User> query)
    {
       return query
        .Include(u => u.WorkoutPlans)
        .ThenInclude(wp => wp.Workouts)
        .ThenInclude(w => w.WorkoutExercises)
        .ThenInclude(we => we.Exercise)
        .Include(u => u.Diets)
        .ThenInclude(d => d.Meals)
        .ThenInclude(m => m.MealFoods)
        .ThenInclude(mf => mf.Food);
    }
}