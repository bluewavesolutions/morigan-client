namespace MoriganBlazorClient.Application.Client.Models
{
    public class CharacterModel
    {
        public long Id { get; set; }

        public string SessionToken { get; set; }

        public long AccountId { get; set; }

        public long MapId { get; set; }

        public string Nick { get; set; }

        public string Outfit { get; set; }

        public long PositionX { get; set; }

        public long PositionY { get; set; }
    }
}