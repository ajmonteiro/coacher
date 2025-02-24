using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

public class DietTypeConfiguration : BaseEntityTypeConfiguration<Diet>
{
    public override void Configure(EntityTypeBuilder<Diet> builder)
    {
        base.Configure(builder);

        builder.HasKey(d => d.Id);
        builder.Property(d => d.Name).HasMaxLength(64).IsRequired();
        builder.Property(d => d.Description).HasMaxLength(255);
        builder.Property(d => d.UserId).IsRequired();


        builder.HasMany(d => d.Meals)
            .WithOne(m => m.Diet)
            .HasForeignKey(m => m.DietId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}
