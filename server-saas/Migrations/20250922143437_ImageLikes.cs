using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server_saas.Migrations
{
    /// <inheritdoc />
    public partial class ImageLikes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GeneratedImages_AspNetUsers_UserId",
                table: "GeneratedImages");

            migrationBuilder.AddColumn<int>(
                name: "Likes",
                table: "GeneratedImages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ImageLikes",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    GeneratedImageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageLikes", x => new { x.UserId, x.GeneratedImageId });
                    table.ForeignKey(
                        name: "FK_ImageLikes_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImageLikes_GeneratedImages_GeneratedImageId",
                        column: x => x.GeneratedImageId,
                        principalTable: "GeneratedImages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImageLikes_GeneratedImageId",
                table: "ImageLikes",
                column: "GeneratedImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_GeneratedImages_AspNetUsers_UserId",
                table: "GeneratedImages",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GeneratedImages_AspNetUsers_UserId",
                table: "GeneratedImages");

            migrationBuilder.DropTable(
                name: "ImageLikes");

            migrationBuilder.DropColumn(
                name: "Likes",
                table: "GeneratedImages");

            migrationBuilder.AddForeignKey(
                name: "FK_GeneratedImages_AspNetUsers_UserId",
                table: "GeneratedImages",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
