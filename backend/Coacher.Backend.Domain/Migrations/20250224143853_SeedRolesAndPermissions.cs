using Coacher.Backend.Domain.Enums;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Coacher.Backend.Domain.Migrations
{
    /// <inheritdoc />
    public partial class SeedRolesAndPermissions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var coachRoleId = Guid.NewGuid();
            var clientRoleId = Guid.NewGuid();
            
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { coachRoleId, "Coach" },
                    { clientRoleId, "User" }
                });

            var permissionIds = new Dictionary<Permission, Guid>();
            foreach (Permission permission in Enum.GetValues(typeof(Permission)))
            {
                var permissionId = Guid.NewGuid();
                permissionIds[permission] = permissionId;

                migrationBuilder.InsertData(
                    table: "Permissions",
                    columns: new[] { "Id", "Name" },
                    values: new object[] { permissionId, permission.ToString() }
                );
            }

            foreach (var permissionId in permissionIds.Values)
            {
                migrationBuilder.InsertData(
                    table: "RolePermissions",
                    columns: new[] { "RoleId", "PermissionId" },
                    values: new object[] { coachRoleId, permissionId }
                );
            }

            migrationBuilder.InsertData(
                table: "RolePermissions",
                columns: new[] { "RoleId", "PermissionId" },
                values: new object[] { clientRoleId, permissionIds[Permission.ReadDashboard] }
            );
            
            migrationBuilder.InsertData(
                table: "RolePermissions",
                columns: new[] { "RoleId", "PermissionId" },
                values: new object[] { clientRoleId, permissionIds[Permission.ReadClientInfo] }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM RolePermissions");
            migrationBuilder.Sql("DELETE FROM Permissions");
            migrationBuilder.Sql("DELETE FROM Roles");
        }
    }
}
