using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MoriganBlazorClient.Application.Components;

namespace MoriganBlazorClient.Application.Commands
{
    public class KeyDownCommandHandler : INotificationHandler<KeyDownCommand>
    {
        private readonly Character _character;

        public KeyDownCommandHandler(Character character)
        {
            _character = character;
        }

        public async Task Handle(KeyDownCommand notification, CancellationToken cancellationToken)
        {
            var direction = GetDirection(notification.Key);

            Console.WriteLine($"KeyDownCommandHandler: {direction}");

            await _character.Move(direction);
        }

        private string GetDirection(string key) => key switch
        {
            "w" => "up",
            "ArrowUp" => "up",
            "s" => "down",
            "ArrowDown" => "down",
            "a" => "left",
            "ArrowLeft" => "left",
            "d" => "right",
            "ArrowRight" => "right",
            _ => null
        };
    }
}