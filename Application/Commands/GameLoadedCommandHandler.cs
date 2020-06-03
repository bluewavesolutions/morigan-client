using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MoriganBlazorClient.Application.Components;
using MoriganBlazorClient.Application.Managers;

namespace MoriganBlazorClient.Application.Commands
{
    public class GameLoadedCommandHandler : INotificationHandler<GameLoadedCommand>
    {
        private readonly Ground _ground;

        private readonly Camera _camera;

        private readonly Character _character;

        private readonly OtherCharactersManager _otherCharactersManager;

        public GameLoadedCommandHandler(Ground ground, 
            Camera camera, 
            Character character, 
            OtherCharactersManager otherCharactersManager)
        {
            _ground = ground;
            _camera = camera;
            _character = character;
            _otherCharactersManager = otherCharactersManager;
        }

        public async Task Handle(GameLoadedCommand notification, CancellationToken cancellationToken)
        {
            System.Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(notification));

            await _ground.LoadGround(notification.GameLoaded.Map);
            await _character.LoadCharacter(notification.GameLoaded.Character);

            foreach(var otherCharacter in notification.GameLoaded.OtherCharacters)
            {
                await _otherCharactersManager.LoadOtherCharacter(otherCharacter);
            }

            _camera.CalculateMaxValues(_ground);
            _camera.CenterToCharacter(_character);
        }
    }
}