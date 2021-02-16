namespace tourism.Models
{
    public class Hotel
    {
        public long id { get; set; }
        public string title { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public decimal price { get; set; }
        public string contact { get; set; }
        public string placement { get; set; }
        public long PackageId { get; set; }

    }
}