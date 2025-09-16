namespace server_saas.Interfaces
{
    public interface IClipDropService
    {
        Task<byte[]> GenerateImageAsync(string prompt, string style);
    }
}
