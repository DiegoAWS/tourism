namespace tourism.Models
{
    public class Transfer
    {
        public long id { get; set; }
        public string title { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public decimal price { get; set; }
        public string type { get; set; }
        public string startPlace { get; set; }
        public string endPlace { get; set; }
        public string stops { get; set; }
        public long PackageId { get; set; }

    }
}