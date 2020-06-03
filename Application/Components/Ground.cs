using System.Threading.Tasks;
using MediatR;
using Microsoft.JSInterop;
using MoriganBlazorClient.Application.Client.Models;
using MoriganBlazorClient.Application.Renderer.Interfaces;

namespace MoriganBlazorClient.Application.Components
{
    public class Ground : IRenderableImage
    {
        private readonly IMediator _mediator;

        private readonly IJSRuntime _jsRuntime;

        private readonly Camera _camera;

        private string ResourceFile { get; set; }

        private long Width { get; set; }

        private long Height { get; set; }

        private long WidthInPixels { get; set; }

        private long HeightInPixels { get; set; }

        public Ground(IMediator mediator, IJSRuntime jsRuntime, Camera camera)
        {
            System.Console.WriteLine($"{nameof(Ground)}->ctor");

            _mediator = mediator;
            _jsRuntime = jsRuntime;
            _camera = camera;
        }

        public async Task LoadGround(MapModel map) 
        {
            ResourceFile = map.ResourceFile;
            Width = map.Width;
            Height = map.Height;
            WidthInPixels = map.WidthInPixels;
            HeightInPixels = map.HeightInPixels;

            await _jsRuntime.InvokeVoidAsync("engine.loadImage", map.ResourceFile);
        }

        public (long groundWidth, long groundHeight) GetDimensions() => (Width, Height);

        public object RenderImage(double time) 
        {
            return new {
                type = "image",
                source = ResourceFile,
                sx = (_camera.CanvasPositionX),
                sy = (_camera.CanvasPositionY),
                sWidth = WidthInPixels, 
                sHeight = HeightInPixels, 
                dx = 0, 
                dy = 0, 
                dWidth = WidthInPixels, 
                dHeight = HeightInPixels
            };
        }
    }
}