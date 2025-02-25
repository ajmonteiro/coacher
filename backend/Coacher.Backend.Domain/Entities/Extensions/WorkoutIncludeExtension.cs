using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Domain.Entities.Extensions {
    public static class WorkoutIncludeExtension
    {
        public static IQueryable<Workout> WithExercises(this IQueryable<Workout> query)
        {
            return query
                .Include(w => w.WorkoutExercises)
                .ThenInclude(we => we.Exercise);
        }

        public static IQueryable<Workout> WorkoutPlanIncluded(this IQueryable<Workout> query)
        {
            return query
                .Include(w => w.WorkoutPlan);
        }

        public static IQueryable<Workout> UserIncluded(this IQueryable<Workout> query)
        {
            return query
                .Include(w => w.WorkoutPlan)
                .ThenInclude(wp => wp.User);
        }
    }
}