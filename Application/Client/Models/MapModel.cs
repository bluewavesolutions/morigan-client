namespace MoriganBlazorClient.Application.Client.Models
{
    public class MapModel
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string ResourceFile { get; set; }

        public string Description { get; set; }

        public long Width { get; set; }
        
        public long Height { get; set; }

        public long WidthInPixels { get; set; }

        public long HeightInPixels { get; set; }
    }
}