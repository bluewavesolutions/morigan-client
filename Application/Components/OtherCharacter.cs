using System.Threading.Tasks;
using Microsoft.JSInterop;
using MoriganBlazorClient.Application.Animations;
using MoriganBlazorClient.Application.Animations.Interfaces;
using MoriganBlazorClient.Application.Client.Models;
using MoriganBlazorClient.Application.Renderer.Interfaces;

namespace MoriganBlazorClient.Application.Components
{
    public class OtherCharacter : IRenderableImage, IAnimatedCanvasPosition
    {
        private readonly IJSRuntime _jsRuntime;

        private readonly Camera _camera;

        public long Id { get; set; }

        public string Nick { get; set; }

        public string Outfit { get; set; }

        public long PositionX { get; set; }

        public long PositionY { get; set; }

        public double CanvasPositionX { get; set; }

        public double CanvasPositionY { get; set; }

        public OtherCharacter(IJSRuntime jsRuntime, Camera camera)
        {     
            System.Console.WriteLine($"{nameof(OtherCharacter)}->ctor");

            _jsRuntime = jsRuntime;
            _camera = camera;
        }

        public async Task LoadOtherCharacter(OtherCharacterModel otherCharacterModel) 
        {
            System.Console.WriteLine($"Loading other character with id: {otherCharacterModel.Id}");

            Id = otherCharacterModel.Id;
            Nick = otherCharacterModel.Nick;
            Outfit = otherCharacterModel.Outfit;
            PositionX = otherCharacterModel.PositionX;
            PositionY = otherCharacterModel.PositionY;
            CanvasPositionX = otherCharacterModel.PositionX * 32;
            CanvasPositionY = otherCharacterModel.PositionY * 32;

            await _jsRuntime.InvokeVoidAsync("engine.loadImage", otherCharacterModel.Outfit);
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
                dx = 0,
                dy = 0,
                dWidth = 32,
                dHeight = 48
            };
        }
    }
}