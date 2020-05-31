using MediatR;
using Microsoft.JSInterop;
using MoriganBlazorClient.Application.Commands;

namespace MoriganBlazorClient.Application.Bridge
{
    public class JsEngineBridge
    {
        private readonly IMediator _mediator;

        public JsEngineBridge(IMediator mediator)
        {
            System.Console.WriteLine($"{nameof(JsEngineBridge)}->ctor");
            
            _mediator = mediator;
        }

        [JSInvokable("WindowResize")]
        public void WindowResize(long width, long height)
        {
            _mediator.Publish(new WindowSizeChangedCommand(width, height));
        }
    }
}