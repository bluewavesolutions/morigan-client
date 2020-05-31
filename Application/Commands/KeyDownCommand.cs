using MediatR;

namespace MoriganBlazorClient.Application.Commands
{
    public class KeyDownCommand : INotification
    {
        public string Key { get; set; }

        public KeyDownCommand(string key)
        {
            Key = key;
        }
    }
}