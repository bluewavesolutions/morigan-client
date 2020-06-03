using System.Collections.Generic;
using MoriganBlazorClient.Application.Client.Models;

namespace MoriganBlazorClient.Application.Client.CommunicationModels
{
    public class GameLoaded
    {
        public CharacterModel Character { get; set; }

        public MapModel Map { get; set; }

        public List<OtherCharacterModel> OtherCharacters { get; set; }
    }
}