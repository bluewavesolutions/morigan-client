using MediatR;

namespace MoriganBlazorClient.Application.Commands
{
    public class MoveCommand : INotification
    {
        public long PositionX { get; set; }

        public long PositionY { get; set; }

        public MoveCommand(long positionX, long positionY) 
        {
            PositionX = positionX;
            PositionY = positionY;
        }
    }
}