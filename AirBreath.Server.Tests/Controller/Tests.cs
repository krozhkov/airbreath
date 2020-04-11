using System.Collections.Generic;
using System.Linq;
using Moq;
using Xunit;
using app = AirBreath.Server;

namespace AirBreath.Server.Tests.Controller
{
    public class Tests
    {
        [Fact]
        public void Index_ReturnsAViewResult_WithAListOfBrainstormSessions()
        {
            var contacts = new List<app.Models.Contact>();
            contacts.Add(new app.Models.Contact { LastName = "Finkley", FirstName = "Adam", Phone = "555-555-5555", Email = "adam@somewhere.com" });
            contacts.Add(new app.Models.Contact { LastName = "Biles", FirstName = "Steven", Phone = "555-555-5555", Email = "sbiles@somewhere.com" });

            var context = new Mock<app.Database.IDbContext>();
            context.Setup(e => e.Set<app.Models.Contact>()).Returns(contacts.AsQueryable());

            var controller = new app.Controllers.ContactsController(context.Object);
            var result = controller.Get();

            Assert.Equal(2, result.Count());
        }
    }
}
