namespace server_saas.Interfaces
{
    public interface IHuggingFaceService
    {
        Task<byte[]> GenerateImageAsync(string prompt, string style);
    }
}
