using Microsoft.AspNetCore.SignalR;

namespace WorkItemEstimate.Server.Hubs
{
    public class CardHub : Hub
    {
        private static Dictionary<string, string> _rooms = new Dictionary<string, string>();

        public async Task JoinRoom(string roomId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
            await Clients.Group(roomId).SendAsync("UserJoined", Context.ConnectionId);
        }

        public async Task SendCardToRoom(string roomId, string card)
        {
            await Clients.OthersInGroup(roomId).SendAsync("ReceiveCard", card);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}