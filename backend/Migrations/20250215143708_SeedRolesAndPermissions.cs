using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using backend.Entities;
using backend.Services.AuthService;
using Permission = backend.Services.AuthService.Permission;

#nullable disable

namespace backend.Migrations
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
                    { clientRoleId, "Client" }
                });

            // Insert Permissions
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

            // Assign all permissions to Coach
            foreach (var permissionId in permissionIds.Values)
            {
                migrationBuilder.InsertData(
                    table: "RolePermissions",
                    columns: new[] { "RoleId", "PermissionId" },
                    values: new object[] { coachRoleId, permissionId }
                );
            }

            // Assign only ReadDashboard to Client
            migrationBuilder.InsertData(
                table: "RolePermissions",
                columns: new[] { "RoleId", "PermissionId" },
                values: new object[] { clientRoleId, permissionIds[Permission.ReadDashboard] }
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
