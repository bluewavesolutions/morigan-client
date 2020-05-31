using System.Threading.Tasks;
using MediatR;
using MoriganBlazorClient.Application.Client.CommunicationModels;
using MoriganBlazorClient.Application.Commands;

namespace MoriganBlazorClient.Application.Client
{
    public class Interpreter
    {
        private readonly IMediator _mediator;

        public Interpreter(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task Interprete(CommunicationModel communicationModel) 
        {
            var serializedModel = System.Text.Json.JsonSerializer.Serialize(communicationModel.Data);

            switch (communicationModel.Type) 
            {
                case "GAME_LOADED":
                    var gameLoaded = System.Text.Json.JsonSerializer.Deserialize<GameLoaded>(serializedModel);
                    await _mediator.Publish(new GameLoadedCommand(gameLoaded));
                    break;
            }
        }
    }
}