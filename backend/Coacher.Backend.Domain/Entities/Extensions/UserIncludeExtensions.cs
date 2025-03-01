using Coacher.Backend.Contracts.Dto;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Domain.Entities.Extensions;

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

    public static UserDto UserToDto(User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            FullName = user.FullName,
            Phone = user.Phone,
            Weight = user.Weight,
            Height = user.Height,
            RoleId = user.RoleId,
            RoleName = user.Role.Name,
            UserPermissions = user.UserPermissions.Select(up => new UserPermissionDto
            {
                Id = up.Id,
                UserId = up.UserId,
                PermissionId = up.PermissionId,
                Permission = new PermissionDto
                {
                    Id = up.Permission.Id,
                    Name = up.Permission.Name,
                },
            }).ToList(),
            WorkoutPlans = user.WorkoutPlans.Select(wp => new WorkoutPlanDto
            {
                Id = wp.Id,
                Name = wp.Name,
                StartDate = wp.StartDate,
                EndDate = wp.EndDate,
                Workouts = wp.Workouts.Select(w => new WorkoutDto
                {
                    Id = w.Id,
                    Name = w.Name,
                    Description = w.Description,
                    WorkoutPlanId = w.WorkoutPlanId,
                    WeekDay = w.WeekDay,
                    UserId = user.Id,
                    Exercises = w.WorkoutExercises.Select(we => new WorkoutExerciseDto
                    {
                        Id = we.Id,
                        Exercise = new ExerciseDto
                        {
                            Id = we.Exercise.Id,
                            Name = we.Exercise.Name,
                            Description = we.Exercise.Description,
                            Video = we.Exercise.Video,
                            ExerciseType = (int)we.Exercise.ExerciseType,
                        },
                        PrescribedReps = we.PrescribedReps,
                        PrescribedSets = we.PrescribedSets,
                    }).ToList()
                }).ToList()
            }).ToList(),
        };
    }
}