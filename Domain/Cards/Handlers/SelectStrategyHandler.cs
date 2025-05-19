using Domain.Cards.Commands;
using Domain.Common;
using Domain.Repositories;
using MediatR;

namespace Domain.Cards.Handlers
{
    public sealed class SelectStrategyHandler(
        IRoomRepository roomRepository,
        IUnitOfWork unitOfWork)
                : IRequestHandler<SelectStrategyCommand, Result<Unit>>
    {
        private readonly IRoomRepository _roomRepository = roomRepository;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Result<Unit>> Handle(
            SelectStrategyCommand request,
            CancellationToken cancellationToken)
        {
            try
            {                
                if (string.IsNullOrWhiteSpace(request.RoomId) ||
                    string.IsNullOrWhiteSpace(request.StrategyId))
                {
                    return Result.Fail<Unit>("Dados inválidos para seleção de estratégia");
                }
                
                var room = await _roomRepository.GetByIdAsync(request.RoomId);
                if (room == null)
                {
                    return Result.Fail<Unit>("Sala não encontrada");
                }
                
                var result = room.SelectStrategy(request.StrategyId, request.UserId);
                if (result.IsFailure)
                {
                    return Result.Fail<Unit>(result.Error);
                }

                await _unitOfWork.CommitAsync(cancellationToken);

                return Result.Ok(Unit.Value);
            }
            catch (Exception ex)
            {
                return Result.Fail<Unit>($"Falha ao selecionar estratégia: {ex.Message}");
            }
        }
    }
}