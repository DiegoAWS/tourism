using System.ComponentModel.DataAnnotations;

namespace tourism.Models.Users
{
    public class AuthenticateModel
    {
        [Required]
        public string username { get; set; }

        [Required]
        public string password { get; set; }
    }
}