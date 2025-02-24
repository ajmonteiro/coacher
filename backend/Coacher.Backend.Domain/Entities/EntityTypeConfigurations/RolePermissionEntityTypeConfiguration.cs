using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

public class RolePermissionEntityTypeConfiguration : BaseEntityTypeConfiguration<RolePermission>
{
    public override void Configure(EntityTypeBuilder<RolePermission> builder)
    {
        base.Configure(builder);

        builder.HasKey(x => new { x.PermissionId, x.RoleId });
    }
}