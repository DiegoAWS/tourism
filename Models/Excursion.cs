namespace tourism.Models
{
    public class Excursion
    {
        public long id { get; set; }
        public string title { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public decimal price { get; set; }
        public long idSalesMan { get; set; }
        public string nameSalesMan { get; set; }
        public string destination { get; set; }
        public string infoDestination { get; set; }
        public string offers { get; set; }
    }
}