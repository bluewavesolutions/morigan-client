using System.Threading.Tasks;

namespace MoriganBlazorClient.Application.Components.Interfaces
{
    public interface IMovable
    {
        Task Move(string direction);
    }
}