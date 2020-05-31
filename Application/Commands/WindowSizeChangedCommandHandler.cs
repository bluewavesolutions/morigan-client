using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MoriganBlazorClient.Application.Components;

namespace MoriganBlazorClient.Application.Commands
{
    public class WindowSizeChangedCommandHandler : INotificationHandler<WindowSizeChangedCommand>
    {
        private readonly Camera _camera;

        private readonly Character _character;

        public WindowSizeChangedCommandHandler(Camera camera, Character character)
        {
            _camera = camera;
            _character = character;
        }

        public async Task Handle(WindowSizeChangedCommand notification, CancellationToken cancellationToken)
        {
            _camera.SetWindowDimensions(notification.Width, notification.Height);
        }
    }
}