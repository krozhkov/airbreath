using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Xunit;
using Xunit.Abstractions;

namespace AirBreath.Server.Tests.Integration.Fixtures
{
    public abstract class ControllerFixture : IClassFixture<ApplicationFactory>
    {
        protected readonly ApplicationFactory _factory;

        public ControllerFixture(ApplicationFactory factory, ITestOutputHelper output)
        {
            this._factory = factory;
            this._factory.Output = output;
        }

        protected async Task<HttpClient> CreateHttpClientAndLogin()
        {
            var client = this._factory.CreateClient();

            var parameters = new Dictionary<string, string>();
            parameters.Add("username", "user@test.com");
            parameters.Add("password", "P2ssw0rd!");

            using (var content = new FormUrlEncodedContent(parameters))
            {
                var response = await client.PostAsync("/api/auth/login", content);
                var responseText = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<dynamic>(responseText);
                var token = (string)result.token.ToString();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }

            return client;
        }
    }
}
