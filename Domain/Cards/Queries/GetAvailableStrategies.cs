using Domain.Common;
using Domain.Repositories;
using MediatR;

namespace Domain.Cards.Queries
{
    public static class GetAvailableStrategies
    {        
        public record Query() : IRequest<Result<List<StrategyResponse>>>;
        
        public record StrategyResponse(string Id, string Name, List<string> Cards);
        
        public class Handler(ICardStrategyRepository strategyRepository) : IRequestHandler<Query, Result<List<StrategyResponse>>>
        {
            private readonly ICardStrategyRepository _strategyRepository = strategyRepository;

            public async Task<Result<List<StrategyResponse>>> Handle(
                Query request,
                CancellationToken cancellationToken)
            {
                var strategies = await _strategyRepository.GetAllAsync();

                var response = strategies.ConvertAll(s =>
                    new StrategyResponse(
                        s.Id,
                        s.Name,
                        s.Cards
                    ));

                return Result.Ok(response);
            }
        }
    }
}