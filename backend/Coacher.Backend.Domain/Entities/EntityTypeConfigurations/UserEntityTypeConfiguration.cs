using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

  public class UserEntityTypeConfiguration : BaseEntityTypeConfiguration<User>
    {
        public override void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);

            builder.HasKey(u => u.Id);
            builder.Property(u => u.Username).HasMaxLength(64).IsRequired();
            builder.Property(u => u.FullName).HasMaxLength(128).IsRequired();
            builder.Property(u => u.Phone).HasMaxLength(32).IsRequired();
            builder.Property(u => u.PasswordHash).HasMaxLength(255).IsRequired();
            builder.Property(u => u.Weight).HasMaxLength(3).IsRequired();
            builder.Property(u => u.Height).HasMaxLength(3).IsRequired();
            builder.Property(u => u.RoleId).IsRequired();
            builder.Property(u => u.RefreshToken).HasMaxLength(255);
            builder.Property(u => u.RefreshTokenExpiryTime);

            builder.HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }