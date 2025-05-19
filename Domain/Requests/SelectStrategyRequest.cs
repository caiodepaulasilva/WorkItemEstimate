namespace Domain.Requests
{
    public record SelectStrategyRequest(
        string StrategyId,
        string UserId
    );
}