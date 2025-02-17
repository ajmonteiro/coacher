using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class FixedWorkoutExercise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkoutExercises",
                table: "WorkoutExercises");

            migrationBuilder.RenameColumn(
                name: "Sets",
                table: "WorkoutExercises",
                newName: "Set");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "WorkoutExercises",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkoutExercises",
                table: "WorkoutExercises",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExercises_WorkoutId",
                table: "WorkoutExercises",
                column: "WorkoutId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkoutExercises",
                table: "WorkoutExercises");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutExercises_WorkoutId",
                table: "WorkoutExercises");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "WorkoutExercises");

            migrationBuilder.RenameColumn(
                name: "Set",
                table: "WorkoutExercises",
                newName: "Sets");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkoutExercises",
                table: "WorkoutExercises",
                columns: new[] { "WorkoutId", "ExerciseId" });
        }
    }
}
