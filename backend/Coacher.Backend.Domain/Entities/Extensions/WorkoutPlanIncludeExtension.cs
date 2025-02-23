using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Domain.Entities.Extensions;

public static class WorkoutPlanIncludeExtension
{
    public static IQueryable<WorkoutPlan> IncludeBasic(this IQueryable<WorkoutPlan> query)
    {
        return query
            .Include(wp => wp.Workouts)
            .ThenInclude(w => w.WorkoutExercises);
    }
}
