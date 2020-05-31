using MediatR;

namespace MoriganBlazorClient.Application.Commands
{
    public class WindowSizeChangedCommand : INotification
    {
        public long Width { get; set; }

        public long Height { get; set; }

        public WindowSizeChangedCommand(long width, long height)
        {
            Width = width;
            Height = height;
        }
    }
}