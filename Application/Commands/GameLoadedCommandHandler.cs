using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MoriganBlazorClient.Application.Components;

namespace MoriganBlazorClient.Application.Commands
{
    public class GameLoadedCommandHandler : INotificationHandler<GameLoadedCommand>
    {
        private readonly Ground _ground;

        private readonly Camera _camera;

        private readonly Character _character;

        public GameLoadedCommandHandler(Ground ground, Camera camera, Character character)
        {
            _ground = ground;
            _camera = camera;
            _character = character;
        }

        public async Task Handle(GameLoadedCommand notification, CancellationToken cancellationToken)
        {
            System.Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(notification));

            await _ground.LoadGround(notification.GameLoaded.Map);
            await _character.LoadCharacter(notification.GameLoaded.Character);

            _camera.CalculateMaxValues(_ground);
            _camera.CenterToCharacter(_character);
        }
    }
}