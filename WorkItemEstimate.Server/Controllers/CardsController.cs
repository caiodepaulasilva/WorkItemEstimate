using Domain.Cards.Commands;
using Domain.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WorkItemEstimate.Server.Controllers
{
    [ApiController]
    [Route("api/cards")]
    public class CardsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost("{roomId}/select-strategy")]
        public async Task<IActionResult> SelectStrategy(
            string roomId,
            [FromBody] SelectStrategyRequest request)
        {
            await _mediator.Send(new SelectStrategyCommand(roomId, request.StrategyId, request.UserId));
            return NoContent();
        }
    }
}
