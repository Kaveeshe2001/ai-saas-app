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

            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new("Bearer", apiKey);

            var requestBody = new
            {
                model = "gemini-2.5-flash",
                messages = new[]
                {
                    new { role = "system", content = "You are a professional blog author who writes clear, engaging, and well-structured articles." },
                    new { role = "user", content = $"Write a '{articleLength}'-word article about: '{topic}'." }
                },
                temperature = 0.7
            };

            var response = await client.PostAsJsonAsync(GeminiAIApiUrl, requestBody);

            if (!response.IsSuccessStatusCode)
            {
                // Log the error response body for debugging
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Gemini API request failed with status code {response.StatusCode}: {errorContent}");
            }

            // Using System.Text.Json.JsonElement to parse the response without a strong type
            using var jsonDoc = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
            var choices = jsonDoc.RootElement.GetProperty("choices");
            var firstChoice = choices[0];
            var message = firstChoice.GetProperty("message");
            var content = message.GetProperty("content").GetString();

            return content ?? string.Empty;
        }
    }
}
