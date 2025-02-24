using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

public class PermissionEntityTypeConfiguration : BaseEntityTypeConfiguration<Permission>
{
    public override void Configure(EntityTypeBuilder<Permission> builder)
    {
        base.Configure(builder);

        builder.HasKey(p => p.Id);
        builder.Property(p => p.Name).IsRequired();

        builder.HasMany(p => p.Roles)
            .WithMany(r => r.Permissions)
            .UsingEntity<RolePermission>(
                j => j
                    .HasOne(rp => rp.Role)
                    .WithMany()
                    .HasForeignKey(rp => rp.RoleId),
                j => j
                    .HasOne(rp => rp.Permission)
                    .WithMany()
                    .HasForeignKey(rp => rp.PermissionId),
                j =>
                {
                    j.HasKey(rp => new { rp.PermissionId, rp.RoleId });
                });
    }
}