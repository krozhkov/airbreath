using Microsoft.AspNetCore.Identity;

namespace AirBreath.Server.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string GivenName { get; set; }
    }
}
