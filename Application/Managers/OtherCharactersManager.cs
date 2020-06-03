using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.JSInterop;
using MoriganBlazorClient.Application.Client.Models;
using MoriganBlazorClient.Application.Components;
using MoriganBlazorClient.Application.Renderer.Interfaces;

namespace MoriganBlazorClient.Application.Managers
{
    public class OtherCharactersManager
    {
        private readonly IJSRuntime _jsRuntime;

        private readonly Camera _camera;

        private List<OtherCharacter> _otherCharacters { get; set; } = new List<OtherCharacter>();

        public OtherCharactersManager(IJSRuntime jsRuntime, Camera camera)
        {
            System.Console.WriteLine($"{nameof(OtherCharactersManager)}->ctor");

            _jsRuntime = jsRuntime;
            _camera = camera;
        }

        public async Task LoadOtherCharacter(OtherCharacterModel otherCharacterModel)
        {
            var otherCharacter = new OtherCharacter(_jsRuntime, _camera);
            await otherCharacter.LoadOtherCharacter(otherCharacterModel);
            _otherCharacters.Add(otherCharacter);
        }

        public IEnumerable<object> RenderImages()
        {
            foreach(var otherCharacter in _otherCharacters) 
            {
                yield return new {
                    type = "image",
                    source = otherCharacter.Outfit,
                    sx = _camera.CanvasPositionX + otherCharacter.CanvasPositionX,
                    sy = _camera.CanvasPositionY + otherCharacter.CanvasPositionY,
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
}