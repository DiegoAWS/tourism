using System.Collections.Generic;

namespace tourism.Models
{
    public class Sale
    {
        public long id { get; set; }
        public string title { get; set; }
        public string startTime { get; set; }
        public string dateSale { get; set; }
        public long idSalesMan { get; set; }
        public string nameSalesMan { get; set; }
        public string agency { get; set; }
        public string client { get; set; }
        public string country { get; set; }
        public string descCoupon { get; set; }
        public int descPercent {get; set; }
        public int amountPeopol { get; set; }
        public decimal totalPrice { get; set; }
        public decimal finalPrive { get; set; }


    }
}