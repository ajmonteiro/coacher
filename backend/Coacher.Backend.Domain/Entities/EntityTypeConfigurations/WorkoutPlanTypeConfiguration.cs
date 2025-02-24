using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

public class WorkoutPlanTypeConfiguration : BaseEntityTypeConfiguration<WorkoutPlan>
{
    public override void Configure(EntityTypeBuilder<WorkoutPlan> builder)
    {
        base.Configure(builder);

        builder.HasKey(wp => wp.Id);
        builder.Property(wp => wp.Name).HasMaxLength(64).IsRequired();
        builder.Property(wp => wp.UserId).IsRequired();
        builder.Property(wp => wp.StartDate).IsRequired();
        builder.Property(wp => wp.EndDate).IsRequired();

        builder.HasMany(wp => wp.Workouts)
            .WithOne(wp => wp.WorkoutPlan)
            .HasForeignKey(w => w.WorkoutPlanId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}
