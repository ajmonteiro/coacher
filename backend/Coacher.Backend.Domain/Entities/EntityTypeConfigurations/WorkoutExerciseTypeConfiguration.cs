using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

class WorkoutExerciseEntityTypeConfiguration : BaseEntityTypeConfiguration<WorkoutExercise>
{
    public override void Configure(EntityTypeBuilder<WorkoutExercise> builder)
    {
        base.Configure(builder);

        builder.HasKey(we => we.Id);
        builder.Property(we => we.WorkoutId)
            .IsRequired();
        builder.Property(we => we.ExerciseId)
            .IsRequired();

        #region Prescribed by Coach.
            builder.Property(we => we.PrescribedSets)
                .IsRequired();
            builder.Property(we => we.PrescribedReps)
                .IsRequired();
        #endregion

        #region User filling.
            builder.Property(we => we.ActualSets)
                .IsRequired(false);
            builder.Property(we => we.ActualReps)
                .IsRequired(false);
            builder.Property(we => we.ActualWeight)
                .IsRequired(false);
        #endregion

        builder.HasOne(we => we.Workout)
            .WithMany(w => w.WorkoutExercises)
            .HasForeignKey(we => we.WorkoutId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(we => we.Exercise)
            .WithMany(w => w.WorkoutExercises)
            .HasForeignKey(we => we.ExerciseId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}