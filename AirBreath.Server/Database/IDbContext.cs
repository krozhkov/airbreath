using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AirBreath.Server.Database
{
    public interface IDbContext
    {
        IQueryable<TEntity> Set<TEntity>() where TEntity : class;
        TEntity Find<TEntity>(params object[] keyValues) where TEntity : class;
        TEntity Add<TEntity>([NotNullAttribute] TEntity entity) where TEntity : class;
        TEntity Update<TEntity>([NotNullAttribute] TEntity entity) where TEntity : class;
        void Delete<TEntity>(params object[] keyValues) where TEntity : class;
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
