namespace Domain.Common.Events
{
    public record StrategySelectedEvent(
        string RoomId,
        string StrategyId,
        string SelectedByUserId
    ) : IDomainEvent;
}