using System;
using System.Threading.Tasks;
using MoriganBlazorClient.Application.Client.CommunicationModels;
using Websocket.Client;

namespace MoriganBlazorClient.Application.Client
{
    public class GameEngineClient
    {
        private WebsocketClient websocketClient;

        private readonly Interpreter _interpreter;

        public GameEngineClient(Interpreter interpreter)
        {
            System.Console.WriteLine($"{nameof(GameEngineClient)}->ctor");

            _interpreter = interpreter;

            var url = new Uri("wss://game-alpha.morigan.pl/ws");
            websocketClient = new WebsocketClient(url);
            websocketClient.ReconnectTimeout = TimeSpan.FromSeconds(30);
            websocketClient.ReconnectionHappened.Subscribe(info => {
                Console.WriteLine(info.Type);
            });

            websocketClient.MessageReceived.Subscribe(async (message) => {
                var communicationModel = System.Text.Json.JsonSerializer.Deserialize<CommunicationModel>(message.Text);
                await _interpreter.Interprete(communicationModel);
            });
        }

        public async Task Start() 
        {
            await websocketClient.Start();
            SendData<object>("LOAD_GAME", new { 
                Jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJzb25xdWVyQG8yLnBsIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE1OTA4NTE0NjgsImV4cCI6MTU5MDkzNzg2OCwiaWF0IjoxNTkwODUxNDY4LCJpc3MiOiJtb3JpZ2FuX2lkZW50aXR5IiwiYXVkIjoibW9yaWdhbl9pZGVudGl0eSJ9.nuKnhIckMcox2rAfaq_hMt5cuplCjh_mFqv8kg2mmNM",
                Character = 1
            });
        }

        public void SendData<T>(string type, T data)
        {
            var serializedMessage = System.Text.Json.JsonSerializer.Serialize(new {
                Type = type,
                Data = data
            });

            websocketClient.Send(serializedMessage);
        }
    }
}