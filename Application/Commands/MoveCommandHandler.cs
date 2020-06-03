using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MoriganBlazorClient.Application.Client;
using MoriganBlazorClient.Application.Components;

namespace MoriganBlazorClient.Application.Commands
{
    public class MoveCommandHandler : INotificationHandler<MoveCommand>
    {
        private readonly Character _character;

        private readonly GameEngineClient _gameEngineClient;

        public MoveCommandHandler(Character character, GameEngineClient gameEngineClient)
        {
            _character = character;
            _gameEngineClient = gameEngineClient;
        }

        public async Task Handle(MoveCommand notification, CancellationToken cancellationToken)
        {
            _gameEngineClient.SendData<object>("MOVE", new {
                SessionToken = _character.SessionToken,
                PositionX = notification.PositionX,
                PositionY = notification.PositionY
            });
        }
    }
}