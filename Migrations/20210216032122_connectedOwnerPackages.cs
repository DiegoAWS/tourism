using Microsoft.EntityFrameworkCore.Migrations;

namespace tourism.Migrations
{
    public partial class connectedOwnerPackages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "idSalesMan",
                table: "Transfer");

            migrationBuilder.DropColumn(
                name: "nameSalesMan",
                table: "Transfer");

            migrationBuilder.DropColumn(
                name: "idSalesMan",
                table: "Hotel");

            migrationBuilder.DropColumn(
                name: "nameSalesMan",
                table: "Hotel");

            migrationBuilder.DropColumn(
                name: "idSalesMan",
                table: "Excursion");

            migrationBuilder.DropColumn(
                name: "nameSalesMan",
                table: "Excursion");

            migrationBuilder.AddColumn<long>(
                name: "idSalesMan",
                table: "Package",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "nameSalesMan",
                table: "Package",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserModel",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    username = table.Column<string>(type: "TEXT", nullable: true),
                    role = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserModel", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserModel");

            migrationBuilder.DropColumn(
                name: "idSalesMan",
                table: "Package");

            migrationBuilder.DropColumn(
                name: "nameSalesMan",
                table: "Package");

            migrationBuilder.AddColumn<long>(
                name: "idSalesMan",
                table: "Transfer",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "nameSalesMan",
                table: "Transfer",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "idSalesMan",
                table: "Hotel",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "nameSalesMan",
                table: "Hotel",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "idSalesMan",
                table: "Excursion",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "nameSalesMan",
                table: "Excursion",
                type: "TEXT",
                nullable: true);
        }
    }
}
