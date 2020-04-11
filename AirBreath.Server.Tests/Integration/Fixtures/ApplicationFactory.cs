using System;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Xunit.Abstractions;
using app = AirBreath.Server;

namespace AirBreath.Server.Tests.Integration.Fixtures
{
    public class ApplicationFactory : WebApplicationFactory<app.Startup>
    {
        // Must be set in each test
        public ITestOutputHelper Output { get; set; }

        private string _dbName = Guid.NewGuid().ToString().Replace("-", "");

        // Uses the generic host
        protected override IHostBuilder CreateHostBuilder()
        {
            var builder = base.CreateHostBuilder();
            builder.ConfigureLogging(logging =>
            {
                logging.ClearProviders(); // Remove other loggers
                logging.AddXUnit(Output); // Use the ITestOutputHelper instance
            });

            return builder;
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                // Remove the app's DefaultDbContext registration.
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<app.Database.DefaultDbContext>)
                );

                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                // Add DefaultDbContext using an in-memory database for testing.
                services.AddDbContext<app.Database.DefaultDbContext>(options =>
                {
                    options.UseInMemoryDatabase(this._dbName);
                });

                // Build the service provider.
                var sp = services.BuildServiceProvider();

                using (var scope = sp.CreateScope())
                {
                    // Seed the database in development mode
                    var dbInitializer = scope.ServiceProvider.GetRequiredService<app.Database.IDefaultDbContextInitializer>();
                    dbInitializer.EnsureCreated();
                    dbInitializer.Seed().GetAwaiter().GetResult();
                }
            });
        }
    }
}
