using MediatR;
using MoriganBlazorClient.Application.Client.CommunicationModels;

namespace MoriganBlazorClient.Application.Commands
{
    public class GameLoadedCommand : INotification
    {
        public GameLoaded GameLoaded { get; set; }

        public GameLoadedCommand(GameLoaded gameLoaded) 
        {
            GameLoaded = gameLoaded;
        }
    }
}