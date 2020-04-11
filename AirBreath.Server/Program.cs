using System;
using System.IO;
using AirBreath.Server.Common;
using AirBreath.Server.Database;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AirBreath.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();
                AppDomain.CurrentDomain.SetData("DataDirectory", Path.Combine(env.ContentRootPath, "Data"));

                var dbContext = scope.ServiceProvider.GetService<DefaultDbContext>();
                dbContext.Database.Migrate();

                if (env.IsDevelopment())
                {
                    // Seed the database in development mode
                    var dbInitializer = scope.ServiceProvider.GetRequiredService<IDefaultDbContextInitializer>();
                    dbInitializer.Seed().GetAwaiter().GetResult();
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(PathUtils.GetContentRootPath())
                .AddXmlFile("App.config")
                .Build();

            return Host.CreateDefaultBuilder(args)
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    // Log to console (stdout) - in production stdout will be written to /var/log/{{app_name}}.out.log
                    logging.AddConsole();
                    logging.AddDebug();
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .UseConfiguration(config)
                        .UseUrls(config["serverBindingUrl"])
                        .UseStartup<Startup>();
                });
        }
    }
}
