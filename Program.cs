using System;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using MoriganBlazorClient.Application.Client;
using MoriganBlazorClient.Application.Bridge;
using MoriganBlazorClient.Application.Components;
using MoriganBlazorClient.Application.Managers;
using MoriganBlazorClient.Application.Renderer;
using MoriganBlazorClient.Application.Animations;

namespace MoriganBlazorClient
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("app");

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.Services.AddScoped<JsEngineBridge>();
            builder.Services.AddScoped<GameEngineClient>();
            builder.Services.AddScoped<KeyboardManager>();
            builder.Services.AddScoped<AnimationManager>();
            builder.Services.AddScoped<OtherCharactersManager>();
            builder.Services.AddScoped<Camera>();
            builder.Services.AddScoped<Renderer>();
            builder.Services.AddScoped<Ground>();
            builder.Services.AddScoped<Character>();
            builder.Services.AddScoped<Interpreter>();
            builder.Services.AddMediatR(Assembly.GetExecutingAssembly());

            await builder.Build().RunAsync();
        }
    }
}
