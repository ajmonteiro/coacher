using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

public class MealEntityTypeConfiguration : BaseEntityTypeConfiguration<Meal>
{
    public override void Configure(EntityTypeBuilder<Meal> builder)
    {
        base.Configure(builder);

        builder.HasKey(m => m.Id);
        builder.Property(m => m.Name).HasMaxLength(64).IsRequired();
        builder.Property(m => m.Description).HasMaxLength(255);
        builder.Property(m => m.DietId).IsRequired();
        

        builder.HasMany(m => m.MealFoods)
            .WithOne()
            .HasForeignKey(mp => mp.MealId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}
