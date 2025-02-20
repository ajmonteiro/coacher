using backend.Models;
using backend.Entities;

namespace backend.Entities.Extensions;
public static class WorkoutExerciseExtensions
{
    public static IQueryable<WorkoutExerciseDto> ToDto(
        this IQueryable<WorkoutExercise> query)
    {
        return query
            .Select(we => new WorkoutExerciseDto
            {
                Id = we.Id,
                WorkoutId = we.WorkoutId,
                Exercise = new ExerciseDto
                {
                    Id = we.Exercise.Id,
                    Name = we.Exercise.Name,
                    Description = we.Exercise.Description,
                    Video = we.Exercise.Video
                },
            });
    }
}