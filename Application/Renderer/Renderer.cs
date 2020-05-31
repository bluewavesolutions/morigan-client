using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.JSInterop;
using MoriganBlazorClient.Application.Components;

namespace MoriganBlazorClient.Application.Renderer
{
    public class Renderer
    {
        private readonly IJSRuntime _jsRuntime;

        private readonly Ground _ground;

        private readonly Character _character;

        public Renderer(IJSRuntime jsRuntime, Ground ground, Character character)
        {
            _jsRuntime = jsRuntime;
            _ground = ground;
            _character = character;
        }

        public async Task Initialize() 
        {
            await _jsRuntime.InvokeVoidAsync("engine.renderer", DotNetObjectReference.Create(this), 0.0d);
        }

        [JSInvokable("Render")]
        public List<object> Render(double time) 
        {
            return new List<object> {
                _ground.RenderImage(time),
                _character.RenderImage(time)
            };
        }
    }
}