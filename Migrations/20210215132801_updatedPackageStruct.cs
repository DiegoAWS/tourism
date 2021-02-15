using Microsoft.EntityFrameworkCore.Migrations;

namespace tourism.Migrations
{
    public partial class updatedPackageStruct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Excursion_Package_Packageid",
                table: "Excursion");

            migrationBuilder.DropForeignKey(
                name: "FK_Hotel_Package_Packageid",
                table: "Hotel");

            migrationBuilder.DropForeignKey(
                name: "FK_Transfer_Package_Packageid",
                table: "Transfer");

            migrationBuilder.DropIndex(
                name: "IX_Transfer_Packageid",
                table: "Transfer");

            migrationBuilder.DropIndex(
                name: "IX_Hotel_Packageid",
                table: "Hotel");

            migrationBuilder.DropIndex(
                name: "IX_Excursion_Packageid",
                table: "Excursion");

            migrationBuilder.DropColumn(
                name: "Packageid",
                table: "Transfer");

            migrationBuilder.DropColumn(
                name: "Packageid",
                table: "Hotel");

            migrationBuilder.DropColumn(
                name: "Packageid",
                table: "Excursion");

            migrationBuilder.AddColumn<string>(
                name: "Excursions",
                table: "Package",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Hotels",
                table: "Package",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Transfers",
                table: "Package",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Excursions",
                table: "Package");

            migrationBuilder.DropColumn(
                name: "Hotels",
                table: "Package");

            migrationBuilder.DropColumn(
                name: "Transfers",
                table: "Package");

            migrationBuilder.AddColumn<long>(
                name: "Packageid",
                table: "Transfer",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Packageid",
                table: "Hotel",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Packageid",
                table: "Excursion",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transfer_Packageid",
                table: "Transfer",
                column: "Packageid");

            migrationBuilder.CreateIndex(
                name: "IX_Hotel_Packageid",
                table: "Hotel",
                column: "Packageid");

            migrationBuilder.CreateIndex(
                name: "IX_Excursion_Packageid",
                table: "Excursion",
                column: "Packageid");

            migrationBuilder.AddForeignKey(
                name: "FK_Excursion_Package_Packageid",
                table: "Excursion",
                column: "Packageid",
                principalTable: "Package",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Hotel_Package_Packageid",
                table: "Hotel",
                column: "Packageid",
                principalTable: "Package",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Transfer_Package_Packageid",
                table: "Transfer",
                column: "Packageid",
                principalTable: "Package",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
