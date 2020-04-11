using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AirBreath.Server.Database;

namespace AirBreath.Server.Controllers
{
    [Authorize(AuthenticationSchemes = "ApiKey")]
    [Route("api/[controller]")]
    public class HardwareController : Controller
    {
        private readonly IDbContext _context;

        public HardwareController(IDbContext context)
        {
            _context = context;
        }

        // GET api/hardware/ping
        [HttpGet("ping")]
        public string Ping()
        {
            return "pong";
        }
    }
}
