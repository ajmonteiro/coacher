using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Coacher.Backend.Domain.Entities.EntityTypeConfigurations;

public class PermissionTypeConfiguration : BaseEntityTypeConfiguration<Permission>
{
    public override void Configure(EntityTypeBuilder<Permission> builder)
    {
        base.Configure(builder);

        builder.HasKey(p => p.Id);
        builder.Property(p => p.Name).HasMaxLength(64).IsRequired();
    }
}
