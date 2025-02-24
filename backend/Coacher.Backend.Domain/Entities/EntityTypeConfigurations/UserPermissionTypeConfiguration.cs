using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

public class UserPermissionTypeConfiguration : BaseEntityTypeConfiguration<UserPermission>
{
    public override void Configure(EntityTypeBuilder<UserPermission> builder)
    {
        base.Configure(builder);
    
        builder.HasKey(x => new { x.PermissionId, x.UserId });
    }
}