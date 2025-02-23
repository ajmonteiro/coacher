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
    }
}