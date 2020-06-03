using System.Threading.Tasks;
using Microsoft.JSInterop;
using MoriganBlazorClient.Application.Animations;
using MoriganBlazorClient.Application.Animations.Interfaces;
using MoriganBlazorClient.Application.Client.Models;
using MoriganBlazorClient.Application.Components.Interfaces;
using MoriganBlazorClient.Application.Renderer.Interfaces;

namespace MoriganBlazorClient.Application.Components
{
    public class Character : IRenderableImage, IMovable, IAnimatedCanvasPosition
    {
        private readonly IJSRuntime _jsRuntime;

        private readonly Camera _camera;

        private readonly AnimationManager _animationManager;

        public long Id { get; set; }

        public string SessionToken { get; set; }

        public long AccountId { get; set; }

        public long MapId { get; set; }

        public string Nick { get; set; }

        public string Outfit { get; set; }

        public long PositionX { get; set; }

        public long PositionY { get; set; }

        public double CanvasPositionX { get; set; }

        public double CanvasPositionY { get; set; }

        private long _stepX { get; set; }

        private long _stepY { get; set; }

        public Character(IJSRuntime jsRuntime, Camera camera, AnimationManager animationManager)
        {     
            System.Console.WriteLine($"{nameof(Character)}->ctor");

            _jsRuntime = jsRuntime;
            _camera = camera;
            _animationManager = animationManager;
        }

        public async Task LoadCharacter(CharacterModel character) 
        {
            Id = character.Id;
            SessionToken = character.SessionToken;
            AccountId = character.AccountId;
            MapId = character.MapId;
            Nick = character.Nick;
            Outfit = character.Outfit;
            PositionX = character.PositionX;
            PositionY = character.PositionY;
            CanvasPositionX = character.PositionX * 32;
            CanvasPositionY = character.PositionY * 32;

            await _jsRuntime.InvokeVoidAsync("engine.loadImage", character.Outfit);
        }
        
        public object RenderImage(double time) 
        {
            return new {
                type = "image",
                source = Outfit,
                sx = _camera.CanvasPositionX + CanvasPositionX,
                sy = _camera.CanvasPositionY + CanvasPositionY,
                sWidth = 32,
                sHeight = 48,
                dx = _stepX,
                dy = _stepY,
                dWidth = 32,
                dHeight = 48
            };
        }

        public async Task Move(string direction)
        {
            switch (direction) 
            {
                case "up":
                    _stepY = 48 * 3;
                    break;
                case "left":
                    _stepY = 48;
                    break;
                case "down":
                    _stepY = 0;
                    break;
                case "right":
                    _stepY = 48 * 2;
                    break;
                default:
                    break;
            }

            _stepX += 32;
            if (_stepX >= 32 * 4) 
            {
                _stepX = 0;
            }

            if (direction == null) 
            {
                _stepX = 0;
            }

            if (_animationManager.Animating(this))
            {
                return;
            }

            var posX = PositionX;
            var posY = PositionY;

            switch (direction) 
            {
                case "up":
                    posY--;
                    break;
                case "down":
                    posY++;
                    break;
                case "left":
                    posX--;
                    break;
                case "right":
                    posX++;
                    break;
            }

            if (string.IsNullOrWhiteSpace(direction) == false)
            {
                _animationManager.Animate(this, posX * 32, posY * 32, 220);

                PositionX = posX;
                PositionY = posY;

                _camera.CenterToCharacter(this);
            }
        }
    }
}