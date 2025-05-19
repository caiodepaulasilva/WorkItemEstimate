using Domain.Common;
using Domain.Common.Events;

namespace Domain.Aggregates
{
    public class Room(string selectedByUserId) : AggregateRoot
    {
        public required string Name { get; set; }

        public ICollection<Participant> Participants { get; set; } = [];

        public string? CurrentStrategyId { get; private set; }
        public string SelectedByUserId { get; private set; } = selectedByUserId;

        public Result SelectStrategy(string strategyId, string userId)
        {            
            if (string.IsNullOrWhiteSpace(strategyId))
                return Result.Fail("Estratégia inválida");

            if (string.IsNullOrWhiteSpace(userId))
                return Result.Fail("Usuário inválido");
            
            CurrentStrategyId = strategyId;
            SelectedByUserId = userId;
            
            RaiseDomainEvent(new StrategySelectedEvent(Id, strategyId, userId));

            return Result.Ok();
        }
    }
}