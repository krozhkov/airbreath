using System.Threading.Tasks;
using Newtonsoft.Json;
using AirBreath.Server.Tests.Integration.Fixtures;
using Xunit;
using Xunit.Abstractions;

namespace AirBreath.Server.Tests.Integration
{
    public class ContactsControllerTests : ControllerFixture
    {
        public ContactsControllerTests(ApplicationFactory factory, ITestOutputHelper output)
            : base(factory, output)
        {
        }

        [Fact]
        public async Task ReturnsListOfAllContacts()
        {
            var client = await this.CreateHttpClientAndLogin();

            var response = await client.GetAsync("/api/contacts");

            response.EnsureSuccessStatusCode();
            var responseText = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<dynamic>(responseText);

            Assert.Equal(result.Count, 2);
        }
    }
}
