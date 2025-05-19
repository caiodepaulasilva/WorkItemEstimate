using Domain.Aggregates;

namespace Domain.Repositories
{
    public interface IRoomRepository
    {
        Task<Room?> GetByIdAsync(string roomId);
    }
}