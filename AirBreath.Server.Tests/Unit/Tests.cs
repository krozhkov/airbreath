using Xunit;
using Xunit.Abstractions;
using app = AirBreath.Server;

namespace AirBreath.Server.Tests.Unit
{
    public class Tests
    {
        private ITestOutputHelper _output;

        public Tests(ITestOutputHelper output)
        {
            this._output = output;
        }

        [Fact]
        public void TestNewContactProperties()
        {
            var contact = new app.Models.Contact();

            Assert.True(string.IsNullOrEmpty(contact.LastName));
            Assert.True(string.IsNullOrEmpty(contact.FirstName));
            Assert.True(string.IsNullOrEmpty(contact.Email));
            Assert.True(string.IsNullOrEmpty(contact.Phone));
        }

        [Fact]
        public void TestApiKeyGenerator()
        {
            var key = app.Common.Utils.GenerateApiKey();
            this._output.WriteLine($"key: {key}");

            Assert.False(string.IsNullOrWhiteSpace(key));
        }
    }
}
