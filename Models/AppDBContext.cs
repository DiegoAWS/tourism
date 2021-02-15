using Microsoft.EntityFrameworkCore;
using tourism.Models;

namespace tourism.Models
{
    public class AppDBContext  : DbContext
    {
        public AppDBContext (DbContextOptions <AppDBContext> options)
            : base(options)
        {
        }

        public DbSet<tourism.Models.Transfer> Transfer { get; set; }

        public DbSet<tourism.Models.Hotel> Hotel { get; set; }

        public DbSet<tourism.Models.Excursion> Excursion { get; set; }

        public DbSet<tourism.Models.Package> Package { get; set; }

        public DbSet<tourism.Models.Sale> Sale { get; set; }

     
    }
}