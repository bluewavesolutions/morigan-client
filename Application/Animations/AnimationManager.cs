using System.Collections.Generic;
using MoriganBlazorClient.Application.Animations.Interfaces;

namespace MoriganBlazorClient.Application.Animations
{
    public class AnimationManager
    {
        private Dictionary<string, Animation> _animations { get; set; } = new Dictionary<string, Animation>();

        public void Animate(IAnimatedCanvasPosition animatedCanvasPosition, long positionX, long positionY, double duration)
        {
            var key = animatedCanvasPosition.GetType().FullName;
            if (_animations.ContainsKey(key)) 
            {
                _animations[key] = new Animation(animatedCanvasPosition, positionX, positionY, duration);
            }
            else
            {
                _animations.Add(key, new Animation(animatedCanvasPosition, positionX, positionY, duration));
            }
        }

        public bool Animating(IAnimatedCanvasPosition animatedCanvasPosition) 
        {
            var key = animatedCanvasPosition.GetType().FullName;
            if (_animations.ContainsKey(key))
            {
                if (_animations[key].Animating)
                {
                    return true;
                }
            }

            return false;
        }

        public void Update(double time)
        {
            foreach(var (key, animation) in _animations)
            {
                animation.Animate(time);
            }
        }
    }
}