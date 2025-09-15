namespace server_saas.Interfaces
{
    public interface IGeminiAIService
    {
        Task<string> GenerateArticleContentAsync(string topic, string articleLength);
    }
}
