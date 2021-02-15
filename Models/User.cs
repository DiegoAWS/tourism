namespace tourism.Models
{
    public class User
    {
        public int id { get; set; }
        public string username { get; set; }
        public string role { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}