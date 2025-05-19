using Domain.Aggregates;
using Domain.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private readonly AppDbContext _context;

        public RoomRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Room?> GetByIdAsync(string roomId)
        {
            return await _context.Rooms
                .Include(r => r.Participants)
                .FirstOrDefaultAsync(r => r.Id == roomId);
        }
    }
}