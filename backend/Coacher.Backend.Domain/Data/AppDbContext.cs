using Coacher.Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Domain.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Diet> Diets { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<WorkoutPlan> WorkoutPlans { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<WorkoutExercise> WorkoutExercises { get; set; }
        public DbSet<DietMeal> DietMeals { get; set; }
        public DbSet<MealFood> MealFoods { get; set; }
        public DbSet<UserPermission> UserPermission { get; set; }
        public DbSet<SetRecord> SetRecords { get; set; }
    }
}