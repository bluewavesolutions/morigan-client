namespace MoriganBlazorClient.Application.Client.CommunicationModels
{
    public class CommunicationModel
    {
        public string Type { get; set; }

        public object Data { get; set; }

        public CommunicationModel(string type, object data)
        {
            Type = type;
            Data = data;
        }

        public CommunicationModel()
        {
        }
    }
}