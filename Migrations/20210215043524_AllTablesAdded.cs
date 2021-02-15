using Microsoft.EntityFrameworkCore.Migrations;

namespace tourism.Migrations
{
    public partial class AllTablesAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateTable(
                name: "Package",
                columns: table => new
                {
                    id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    title = table.Column<string>(type: "TEXT", nullable: true),
                    price = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Package", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Excursion",
                columns: table => new
                {
                    id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    title = table.Column<string>(type: "TEXT", nullable: true),
                    startTime = table.Column<string>(type: "TEXT", nullable: true),
                    endTime = table.Column<string>(type: "TEXT", nullable: true),
                    price = table.Column<decimal>(type: "TEXT", nullable: false),
                    idSalesMan = table.Column<long>(type: "INTEGER", nullable: false),
                    nameSalesMan = table.Column<string>(type: "TEXT", nullable: true),
                    destination = table.Column<string>(type: "TEXT", nullable: true),
                    infoDestination = table.Column<string>(type: "TEXT", nullable: true),
                    offers = table.Column<string>(type: "TEXT", nullable: true),
                    Packageid = table.Column<long>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Excursion", x => x.id);
                    table.ForeignKey(
                        name: "FK_Excursion_Package_Packageid",
                        column: x => x.Packageid,
                        principalTable: "Package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sale",
                columns: table => new
                {
                    id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    title = table.Column<string>(type: "TEXT", nullable: true),
                    startTime = table.Column<string>(type: "TEXT", nullable: true),
                    dateSale = table.Column<string>(type: "TEXT", nullable: true),
                    idSalesMan = table.Column<long>(type: "INTEGER", nullable: false),
                    nameSalesMan = table.Column<string>(type: "TEXT", nullable: true),
                    agency = table.Column<string>(type: "TEXT", nullable: true),
                    client = table.Column<string>(type: "TEXT", nullable: true),
                    country = table.Column<string>(type: "TEXT", nullable: true),
                    descCoupon = table.Column<string>(type: "TEXT", nullable: true),
                    descPercent = table.Column<int>(type: "INTEGER", nullable: false),
                    amountPeopol = table.Column<int>(type: "INTEGER", nullable: false),
                    totalPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    finalPrive = table.Column<decimal>(type: "TEXT", nullable: false),
                    Packageid = table.Column<long>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sale", x => x.id);
                    table.ForeignKey(
                        name: "FK_Sale_Package_Packageid",
                        column: x => x.Packageid,
                        principalTable: "Package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Sale_Packageid",
                table: "Sale",
                column: "Packageid");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hotel_Package_Packageid",
                table: "Hotel");

            migrationBuilder.DropForeignKey(
                name: "FK_Transfer_Package_Packageid",
                table: "Transfer");

            migrationBuilder.DropTable(
                name: "Excursion");

            migrationBuilder.DropTable(
                name: "Sale");

            migrationBuilder.DropTable(
                name: "Package");

            migrationBuilder.DropIndex(
                name: "IX_Transfer_Packageid",
                table: "Transfer");

            migrationBuilder.DropIndex(
                name: "IX_Hotel_Packageid",
                table: "Hotel");

            migrationBuilder.DropColumn(
                name: "Packageid",
                table: "Transfer");

            migrationBuilder.DropColumn(
                name: "Packageid",
                table: "Hotel");
        }
    }
}
