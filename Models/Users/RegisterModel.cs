using System.ComponentModel.DataAnnotations;

namespace tourism.Models.Users
{
    public class RegisterModel
    {

        [Required]
        public string username { get; set; }

        [Required]
        public string role { get; set; }


        [Required]
        public string password { get; set; }
    }
}