using MoriganBlazorClient.Application.Animations.Interfaces;

namespace MoriganBlazorClient.Application.Animations
{
    public class Animation
    {
        private readonly IAnimatedCanvasPosition _animatedCanvasPosition;

        private readonly long _positionX;

        private readonly long _positionY;

        private readonly double _duration;

        private readonly double _deltaX;

        private readonly double _deltaY;

        private bool _isStated { get; set; } = false;

        private double _startTime { get; set; } = 0;

        private bool _finished { get; set; } = false;

        private double _lastUpdate { get; set; } = 0;

        public Animation(IAnimatedCanvasPosition animatedCanvasPosition,
            long positionX,
            long positionY,
            double duration)
        {
            _animatedCanvasPosition = animatedCanvasPosition;
            _positionX = positionX;
            _positionY = positionY;
            _duration = duration;

            _deltaX = positionX - animatedCanvasPosition.CanvasPositionX;
            _deltaY = positionY - animatedCanvasPosition.CanvasPositionY;
        }

        public bool Animating => _isStated && _finished == false;

        public void Animate(double time)
        {
            if (_finished) 
            {
                return;
            }

            if(_isStated == false) 
            {
                _isStated = true;
                _startTime = time;
                _lastUpdate = time;
            }

            var timeDelta = time - _lastUpdate;
            _lastUpdate = time;

            var paramDelta = timeDelta / _duration;
            _animatedCanvasPosition.CanvasPositionX += paramDelta * _deltaX;
            _animatedCanvasPosition.CanvasPositionY += paramDelta * _deltaY;

            if (time > _startTime + _duration) 
            {
                _finished = true;
                _animatedCanvasPosition.CanvasPositionX = _positionX;
                _animatedCanvasPosition.CanvasPositionY = _positionY;
            }
        }
    }
}