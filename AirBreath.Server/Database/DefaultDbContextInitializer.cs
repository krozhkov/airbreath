using AirBreath.Server.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AirBreath.Server.Database
{
    public class DefaultDbContextInitializer : IDefaultDbContextInitializer
    {
        private readonly DefaultDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DefaultDbContextInitializer(DefaultDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _context = context;
            _roleManager = roleManager;
        }

        public bool EnsureCreated()
        {
            return _context.Database.EnsureCreated();
        }

        public async Task Seed()
        {
            var email = "user@test.com";
            if (await _userManager.FindByEmailAsync(email) == null)
            {
                var user = new ApplicationUser
                {
                    UserName = email,
                    Email = email,
                    EmailConfirmed = true,
                    GivenName = "John Doe"
                };

                await _userManager.CreateAsync(user, "P2ssw0rd!");
            }

            if (_context.Contacts.Any())
            {
                foreach (var u in _context.Contacts)
                {
                    _context.Remove(u);
                }
            }

            if (_context.ApiKeys.Any())
            {
                foreach (var u in _context.ApiKeys)
                {
                    _context.Remove(u);
                }
            }

            _context.Contacts.Add(new Contact { LastName = "Finkley", FirstName = "Adam", Phone = "555-555-5555", Email = "adam@somewhere.com" });
            _context.Contacts.Add(new Contact { LastName = "Biles", FirstName = "Steven", Phone = "555-555-5555", Email = "sbiles@somewhere.com" });

            _context.ApiKeys.Add(new ApiKey { Owner = "hw", Key = "j8+5h1B2HXcOW6MKiv8G6w6Rxq15/t1cy9o+ucbwrXM=", Created = DateTime.UtcNow });

            _context.SaveChanges();
        }
    }

    public interface IDefaultDbContextInitializer
    {
        bool EnsureCreated();
        Task Seed();
    }
}
