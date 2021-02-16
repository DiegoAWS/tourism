using System.Collections.Generic;

namespace tourism.Models
{
    public class Package
    {
        public long id { get; set; }
        public string title { get; set; }
        public decimal price { get; set; }

        public long idSalesMan { get; set; }
        public string nameSalesMan { get; set; }

        public ICollection<Excursion> Excursions { get; set; }
        public ICollection<Hotel> Hotels { get; set; }
        public ICollection<Transfer> Transfers { get; set; }

    }
}