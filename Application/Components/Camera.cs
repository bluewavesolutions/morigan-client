using MediatR;

namespace MoriganBlazorClient.Application.Components
{
    public class Camera
    {
        private long _positionX { get; set; }

        private long _positionY { get; set; }

        private long _width { get; set; }

        private long _height { get; set; }

        private long _maxX { get; set; }

        private long _maxY { get; set; }

        public Camera()
        {
            System.Console.WriteLine($"{nameof(Camera)}->ctor");
        }

        public void SetWindowDimensions(long width, long height) 
        {
            _width = width;
            _height = height;
        }

        public void CenterToCharacter(Character character) 
        {
            var positionX = -character.PositionX + (_width / 2 / 32) - 1;
            var positionY = -character.PositionY + (_height / 2 / 32) - 1;

            if (positionX > 0) {
                positionX = 0;
            }

            if (positionY > 0) {
                positionY = 0;
            }

            if (positionY < _maxY) {
                positionY = _maxY;
            }

            if (positionX < _maxX) {
                positionX = _maxX;
            }

            _positionX = positionX;
            _positionY = positionY;
        }

        public void CalculateMaxValues(Ground ground) 
        {
            var (groundWidth, groundHeight) = ground.GetDimensions();

            var x = (_width) / 32;
            var y = (_height) / 32;

            long offsetX = 0;
            long offsetY = 0;

            if (_width > groundWidth * 32) {
                offsetX = (_width - (groundWidth * 32)) / 2 / 32;
            }

            if (_height > groundHeight * 32) {
                offsetY = (_height - (groundHeight * 32)) / 2 / 32;
            }

            _maxX = -groundWidth + x - offsetX;
            _maxY = -groundHeight + y - offsetY;
        }

        public (long positionX, long positionY) GetPosition() => (_positionX, _positionY);
    }
}