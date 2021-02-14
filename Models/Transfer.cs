namespace tourism_desk.Models
{
    public class Transfer
    {
        public long id { get; set; }
        public string title { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public string price { get; set; }
        public long idSalesMan { get; set; }
        public string nameSalesMan { get; set; }
        public string type { get; set; }
        public string startPlace { get; set; }
        public string endPlace { get; set; }
        public string stops { get; set; }
    }
}