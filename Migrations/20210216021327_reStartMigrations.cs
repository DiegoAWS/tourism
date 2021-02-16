using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace tourism.Migrations
{
    public partial class reStartMigrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    finalPrive = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sale", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    username = table.Column<string>(type: "TEXT", nullable: true),
                    role = table.Column<string>(type: "TEXT", nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "BLOB", nullable: true),
                    PasswordSalt = table.Column<byte[]>(type: "BLOB", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
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
                    PackageId = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Excursion", x => x.id);
                    table.ForeignKey(
                        name: "FK_Excursion_Package_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Hotel",
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
                    contact = table.Column<string>(type: "TEXT", nullable: true),
                    placement = table.Column<string>(type: "TEXT", nullable: true),
                    PackageId = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hotel", x => x.id);
                    table.ForeignKey(
                        name: "FK_Hotel_Package_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transfer",
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
                    type = table.Column<string>(type: "TEXT", nullable: true),
                    startPlace = table.Column<string>(type: "TEXT", nullable: true),
                    endPlace = table.Column<string>(type: "TEXT", nullable: true),
                    stops = table.Column<string>(type: "TEXT", nullable: true),
                    PackageId = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transfer", x => x.id);
                    table.ForeignKey(
                        name: "FK_Transfer_Package_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Package",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Excursion_PackageId",
                table: "Excursion",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_Hotel_PackageId",
                table: "Hotel",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_Transfer_PackageId",
                table: "Transfer",
                column: "PackageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Excursion");

            migrationBuilder.DropTable(
                name: "Hotel");

            migrationBuilder.DropTable(
                name: "Sale");

            migrationBuilder.DropTable(
                name: "Transfer");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Package");
        }
    }
}
