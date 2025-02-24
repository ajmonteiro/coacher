using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

public class FoodTypeConfiguration : IEntityTypeConfiguration<Food>
{
    public void Configure(EntityTypeBuilder<Food> builder)
    {
        builder.HasKey(f => f.Id);
        builder.Property(f => f.Name).HasMaxLength(64).IsRequired();
        builder.Property(f => f.Description).HasMaxLength(255).IsRequired();
        builder.Property(f => f.Calories).IsRequired();
        builder.Property(f => f.Protein).IsRequired();
        builder.Property(f => f.Carbs).IsRequired();
        builder.Property(f => f.Fat).IsRequired();
    }
}
