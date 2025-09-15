using server_saas.Interfaces;
using System.Text.Json;

namespace server_saas.Service
{
    public class GeminiAIService : IGeminiAIService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;
        private const string GeminiAIApiUrl = "";

        public GeminiAIService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }

        public async Task<string> GenerateArticleContentAsync(string topic, string articleLength)
        {
            var apiKey = _config["Gemini:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new InvalidOperationException("Gemini API key is not configured");
            }

            var apiUrl = $"";
            var client = _httpClientFactory.CreateClient();

            var promptText = $"You are a professional blog author. Write a {articleLength} article about: '{topic}'.";

            var requestBody = new
            {
                model = "gemini-2.5-flash",
                contents = new[]
                {
                    new { parts = new[] { new { text = promptText } } }
                },
                temperature = 0.7
            };

            var response = await client.PostAsJsonAsync(apiUrl, requestBody);

            if (!response.IsSuccessStatusCode)
            {
                // Log the error response body for debugging
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Gemini API request failed with status code {response.StatusCode}: {errorContent}");
            }

            // Using System.Text.Json.JsonElement to parse the response without a strong type
            using var jsonDoc = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
            var candidates = jsonDoc.RootElement.GetProperty("candidates");
            var firstCandidate = candidates[0];
            var content = firstCandidate.GetProperty("content");
            var parts = content.GetProperty("parts");
            var firstPart = parts[0];
            var generatedText = firstPart.GetProperty("text").GetString();

            return generatedText ?? string.Empty;
        }
    }
}
