using System.Linq;
using AirBreath.Server.Extensions;
using AirBreath.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AirBreath.Server.Database
{
    public class DefaultDbContext : IdentityDbContext<ApplicationUser>, IDbContext
    {
        public DefaultDbContext(DbContextOptions<DefaultDbContext> options)
          : base(options)
        {
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<ApiKey> ApiKeys { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                // Remove 'AspNet' prefix and convert table name from PascalCase to snake_case. E.g. AspNetRoleClaims -> role_claims
                entity.SetTableName(entity.GetTableName().Replace("AspNet", "").ToSnakeCase());

                // Convert column names from PascalCase to snake_case.
                foreach (var property in entity.GetProperties())
                {
                    property.SetColumnName(property.Name.ToSnakeCase());
                }

                // Convert primary key names from PascalCase to snake_case. E.g. PK_users -> pk_users
                foreach (var key in entity.GetKeys())
                {
                    key.SetName(key.GetName().ToSnakeCase());
                }

                // Convert foreign key names from PascalCase to snake_case.
                foreach (var key in entity.GetForeignKeys())
                {
                    key.SetConstraintName(key.GetConstraintName().ToSnakeCase());
                }

                // Convert index names from PascalCase to snake_case.
                foreach (var index in entity.GetIndexes())
                {
                    index.SetName(index.GetName().ToSnakeCase());
                }
            }

        }

        TEntity IDbContext.Add<TEntity>(TEntity value)
        {
            var entity = this.Add<TEntity>(value);
            return entity.Entity;
        }

        IQueryable<TEntity> IDbContext.Set<TEntity>()
        {
            return this.Set<TEntity>().AsQueryable();
        }

        TEntity IDbContext.Update<TEntity>(TEntity value)
        {
            var entity = this.Update<TEntity>(value);
            return entity.Entity;
        }

        void IDbContext.Delete<TEntity>(params object[] keyValues)
        {
            var existing = this.Find<TEntity>(keyValues);
            if (existing != null)
            {
                this.Remove(existing);
            }
        }
    }
}
