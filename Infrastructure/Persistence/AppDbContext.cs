using Domain.Aggregates;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Room> Rooms => Set<Room>();
        public DbSet<Participant> Participants => Set<Participant>();
    }
}