using System.Threading.Tasks;
using AirBreath.Server.Tests.Integration.Fixtures;
using Xunit;
using Xunit.Abstractions;

namespace AirBreath.Server.Tests.Integration
{
    public class HardwareControllerTests : ControllerFixture
    {
        public HardwareControllerTests(ApplicationFactory factory, ITestOutputHelper output)
            : base(factory, output)
        {
        }

        [Fact]
        public async Task TestApiKeyAuthentication()
        {
            var client = this._factory.CreateClient();

            client.DefaultRequestHeaders.Add("X-Api-Key", new string[] { "j8+5h1B2HXcOW6MKiv8G6w6Rxq15/t1cy9o+ucbwrXM=" });

            var response = await client.GetAsync("/api/hardware/ping");

            response.EnsureSuccessStatusCode();
            var responseText = await response.Content.ReadAsStringAsync();

            Assert.Equal("pong", responseText);
        }
    }
}
