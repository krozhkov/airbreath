using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace AirBreath.Server.Database
{
    // need for `dotnet ef migrations add [migration]` command
    // after run `dotnet ef database update`
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DefaultDbContext>
    {
        public DefaultDbContext CreateDbContext(string[] args)
        {
            var currentDirectory = System.IO.Directory.GetCurrentDirectory();
            var config = new ConfigurationBuilder()
                .SetBasePath(currentDirectory)
                .AddXmlFile("App.config")
                .Build();

            var options = new DbContextOptionsBuilder<DefaultDbContext>();
            options.UseSqlite(config.GetConnectionString("defaultConnection"));

            AppDomain.CurrentDomain.SetData("DataDirectory", Path.Combine(currentDirectory, "Data"));

            return new DefaultDbContext(options.Options);
        }
    }
}
