using Domain.Common;
using MediatR;

namespace Domain.Cards.Commands
{
    public sealed record SelectStrategyCommand(
        string RoomId,
        string StrategyId,
        string UserId
    ) : IRequest<Result<Unit>>;
}