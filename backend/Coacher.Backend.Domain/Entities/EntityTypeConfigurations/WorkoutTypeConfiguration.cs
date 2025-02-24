using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

public class WorkoutTypeConfiguration : BaseEntityTypeConfiguration<Workout>
{
    public override void Configure(EntityTypeBuilder<Workout> builder)
    {
        base.Configure(builder);
        
        builder.HasKey(w => w.Id);
        builder.Property(w => w.WorkoutPlanId).IsRequired();
        builder.Property(w => w.Name).HasMaxLength(64).IsRequired();
        builder.Property(w => w.Description).HasMaxLength(1024);
        builder.Property(w => w.WeekDay).IsRequired();
        
        builder.HasOne(w => w.WorkoutPlan)
            .WithMany(w => w.Workouts)
            .HasForeignKey(w => w.WorkoutPlanId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}