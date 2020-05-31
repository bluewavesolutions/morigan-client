using MediatR;

namespace MoriganBlazorClient.Application.Commands
{
    public class KeyUpCommand : INotification
    {
        public string Key { get; set; }

        public KeyUpCommand(string key)
        {
            Key = key;
        }
    }
}