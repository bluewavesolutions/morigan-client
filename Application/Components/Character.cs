using System.Threading.Tasks;
using Microsoft.JSInterop;
using MoriganBlazorClient.Application.Client.Models;
using MoriganBlazorClient.Application.Components.Interfaces;
using MoriganBlazorClient.Application.Renderer.Interfaces;

namespace MoriganBlazorClient.Application.Components
{
    public class Character : IRenderableImage, IMovable
    {
        private readonly IJSRuntime _jsRuntime;

        private readonly Camera _camera;

        public long Id { get; set; }

        public string SessionToken { get; set; }

        public long AccountId { get; set; }

        public long MapId { get; set; }

        public string Nick { get; set; }

        public string Outfit { get; set; }

        public long PositionX { get; set; }

        public long PositionY { get; set; }

        public Character(IJSRuntime jsRuntime, Camera camera)
        {
            _jsRuntime = jsRuntime;
            _camera = camera;
            
            System.Console.WriteLine($"{nameof(Character)}->ctor");
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

            System.Console.WriteLine(PositionX);
            System.Console.WriteLine(PositionY);

            await _jsRuntime.InvokeVoidAsync("engine.loadImage", character.Outfit);
        }
        
        public object RenderImage(double time) 
        {
            var (cameraPositionX, cameraPositionY) = _camera.GetPosition();

            return new {
                type = "image",
                source = Outfit,
                sx = (cameraPositionX * 32) + (PositionX * 32),
                sy = (cameraPositionY * 32) + (PositionY * 32),
                sWidth = 32,
                sHeight = 48,
                dx = 0,
                dy = 0,
                dWidth = 32,
                dHeight = 48
            };
        }

        public async Task Move(string direction)
        {
            switch(direction) 
            {
                case "up":
                    PositionY--;
                    break;
                case "down":
                    PositionY++;
                    break;
                case "left":
                    PositionX--;
                    break;
                case "right":
                    PositionX++;
                    break;
            }

            _camera.CenterToCharacter(this);
        }
    }
}