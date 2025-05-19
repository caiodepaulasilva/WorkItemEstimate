using Domain.Repositories;
using Infrastructure.Persistence;

namespace Infrastructure.Data
{
    public class UnitOfWork(AppDbContext context) : IUnitOfWork
    {
        private readonly AppDbContext _context = context;

        public async Task<int> CommitAsync(CancellationToken cancellationToken = default)
        {
            return await _context.SaveChangesAsync(cancellationToken);
        }

        public Task RollbackAsync()
        {
            throw new NotImplementedException();
        }
    }
}