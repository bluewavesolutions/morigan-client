using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.JSInterop;
using MoriganBlazorClient.Application.Commands;

namespace MoriganBlazorClient.Application.Managers
{
    public class KeyboardManager
    {
        private readonly IMediator _mediator;

        public KeyboardManager(IMediator mediator)
        {
            _mediator = mediator;
        }

        [JSInvokable]
        public async Task OnKeyDown(string key) 
        {
            await _mediator.Publish(new KeyDownCommand(key));
        }

        [JSInvokable]
        public async Task OnKeyUp(string key) 
        {
            await _mediator.Publish(new KeyUpCommand(key));
        }
    }
}