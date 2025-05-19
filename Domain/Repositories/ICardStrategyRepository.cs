using Domain.Aggregates;

namespace Domain.Repositories
{
    public interface ICardStrategyRepository
    {
        Task<List<CardStrategy>> GetAllAsync();
    }
}