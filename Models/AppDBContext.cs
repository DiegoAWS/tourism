using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using tourism.Models;

namespace tourism.Models
{


    public class AppDBContext : DbContext
    {

        protected readonly IConfiguration Configuration;
        public AppDBContext(IConfiguration configuration, DbContextOptions<AppDBContext> options)
            : base(options)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sqlite database
            options.UseSqlite(Configuration.GetConnectionString("sqliteDB"));
        }

        public DbSet<tourism.Models.Transfer> Transfer { get; set; }

        public DbSet<tourism.Models.Hotel> Hotel { get; set; }

        public DbSet<tourism.Models.Excursion> Excursion { get; set; }

        public DbSet<tourism.Models.Package> Package { get; set; }

        public DbSet<tourism.Models.Sale> Sale { get; set; }

        public DbSet<User> Users { get; set; }
public DbSet<tourism.Models.Users.UserModel> UserModel { get; set; }

protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Package>()
            .HasMany(t => t.Transfers)
            .WithOne();

              modelBuilder.Entity<Package>()
            .HasMany(t => t.Hotels)
            .WithOne();

              modelBuilder.Entity<Package>()
            .HasMany(t => t.Excursions)
            .WithOne();
    }

    }
}