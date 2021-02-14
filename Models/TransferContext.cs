using Microsoft.EntityFrameworkCore;

namespace tourism_desk.Models
{
    public class TransferContext  : DbContext
    {
        public TransferContext (DbContextOptions <TransferContext> options)
            : base(options)
        {
        }

        public DbSet<Transfer> Transfers { get; set; }
    }
}