namespace server_saas.Interfaces
{
    public interface IOpenAIService
    {
        Task<string> GenerateArticleContentAsync(string topic);
    }
}
