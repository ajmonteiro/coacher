using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

public class MealFoodTypeConfiguration : BaseEntityTypeConfiguration<MealFood>
{
    public override void Configure(EntityTypeBuilder<MealFood> builder)
    {
        base.Configure(builder);
        
        builder.HasKey(mf => new { mf.MealId, mf.FoodId });
        
        builder.HasOne(mf => mf.Meal)
            .WithMany(m => m.MealFoods)
            .HasForeignKey(mf => mf.MealId)
            .OnDelete(DeleteBehavior.Cascade);
            
        builder.HasOne(mf => mf.Food)
            .WithMany()
            .HasForeignKey(mf => mf.FoodId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}