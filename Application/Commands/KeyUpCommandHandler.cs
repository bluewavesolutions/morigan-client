using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MoriganBlazorClient.Application.Components;

namespace MoriganBlazorClient.Application.Commands
{
    public class KeyUpCommandHandler : INotificationHandler<KeyUpCommand>
    {
        private readonly Character _character;

        public KeyUpCommandHandler(Character character)
        {
            _character = character;
        }

        public async Task Handle(KeyUpCommand notification, CancellationToken cancellationToken)
        {
            Console.WriteLine($"KeyUpCommandHandler: {notification.Key}");
            await _character.Move(null);
        }
    }
}