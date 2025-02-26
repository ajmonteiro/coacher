using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

public class ExerciseTypeConfiguration : BaseEntityTypeConfiguration<Exercise>
{
    public override void Configure(EntityTypeBuilder<Exercise> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.Property(e => e.Name).HasMaxLength(64).IsRequired();
        builder.Property(e => e.Description).HasMaxLength(1000).IsRequired();
        builder.Property(e => e.Video).HasMaxLength(255).IsRequired();
        builder.Property(e => e.ExerciseType).IsRequired();
    }
}
