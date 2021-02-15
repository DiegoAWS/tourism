using Microsoft.EntityFrameworkCore;

namespace tourism.Models
{
    public class AppDBContext  : DbContext
    {
        public AppDBContext (DbContextOptions <AppDBContext> options)
            : base(options)
        {
        }

        public DbSet<Transfer> Transfers { get; set; }

     
    }
}