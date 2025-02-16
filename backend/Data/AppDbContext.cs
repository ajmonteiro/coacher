using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Diet> Diets { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<WorkoutExercise> WorkoutExercises { get; set; }
        public DbSet<DietMeal> DietMeals { get; set; }
        public DbSet<MealFood> MealFoods { get; set; }
        public DbSet<UserPermission> UserPermission { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(b =>
            {
                b.HasKey(u => u.Id);

                b.HasOne(u => u.Role)
                    .WithMany()
                    .HasForeignKey(u => u.RoleId)
                    .IsRequired();
            });
            
            modelBuilder.Entity<UserPermission>()
                .HasKey(up => up.Id);

            modelBuilder.Entity<UserPermission>()
                .HasOne(up => up.User)
                .WithMany(u => u.UserPermissions)
                .HasForeignKey(up => up.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserPermission>()
                .HasOne(up => up.Permission)
                .WithMany()
                .HasForeignKey(up => up.PermissionId)
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<UserPermission>(b =>
            {
                b.HasKey(up => up.Id);
            });
            
            
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany()
                .HasForeignKey(u => u.RoleId);

            modelBuilder.Entity<RolePermission>()
                .HasKey(rp => new { rp.RoleId, rp.PermissionId });

            modelBuilder.Entity<RolePermission>()
                .HasOne(rp => rp.Role)
                .WithMany()
                .HasForeignKey(rp => rp.RoleId);

            modelBuilder.Entity<RolePermission>()
                .HasOne(rp => rp.Permission)
                .WithMany()
                .HasForeignKey(rp => rp.PermissionId);


            modelBuilder.Entity<Workout>()
                .HasOne(w => w.User)
                .WithMany(u => u.Workouts)
                .HasForeignKey(w => w.UserId);

            modelBuilder.Entity<Diet>()
                .HasOne(d => d.User)
                .WithMany(u => u.Diets)
                .HasForeignKey(d => d.UserId);

            modelBuilder.Entity<WorkoutExercise>()
                .HasKey(we => new { we.WorkoutId, we.ExerciseId });

            modelBuilder.Entity<WorkoutExercise>()
                .HasOne(we => we.Workout)
                .WithMany(w => w.WorkoutExercises)
                .HasForeignKey(we => we.WorkoutId);

            modelBuilder.Entity<WorkoutExercise>()
                .HasOne(we => we.Exercise)
                .WithMany(e => e.WorkoutExercises)
                .HasForeignKey(we => we.ExerciseId);

            modelBuilder.Entity<Meal>()
                .HasOne(m => m.Diet)
                .WithMany(d => d.Meals)
                .HasForeignKey(m => m.DietId);

            // Meal - Food (Many-to-many using MealFood)
            modelBuilder.Entity<MealFood>()
                .HasKey(mf => new { mf.MealId, mf.FoodId });

            modelBuilder.Entity<MealFood>()
                .HasOne(mf => mf.Meal)
                .WithMany(m => m.MealFoods)
                .HasForeignKey(mf => mf.MealId);

            modelBuilder.Entity<MealFood>()
                .HasOne(mf => mf.Food)
                .WithMany(f => f.MealFoods)
                .HasForeignKey(mf => mf.FoodId);
        }
    }
}