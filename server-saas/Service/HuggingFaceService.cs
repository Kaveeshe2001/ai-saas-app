using server_saas.Interfaces;
using System.Net.Http.Headers;

namespace server_saas.Service
{
    public class HuggingFaceService : IHuggingFaceService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;
        private readonly ILogger<HuggingFaceService> _logger;

        private const string ApiUrl = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

        public HuggingFaceService(IHttpClientFactory httpClientFactory, IConfiguration config, ILogger<HuggingFaceService> logger)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
            _logger = logger;
        }

        public async Task<byte[]> GenerateImageAsync(string prompt, string style)
        {
            var apiKey = _config["HuggingFace:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new InvalidOperationException("Hugging Face API key is not configured.");
            }

            var client = _httpClientFactory.CreateClient();
            // Hugging Face uses a Bearer token for authentication
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            //Combine the prompt and style into one string
            var enhancedPrompt = $"{prompt}, {style} style";

            // The request body is a simple JSON object
            var requestBody = new { inputs = enhancedPrompt };

            var response = await client.PostAsJsonAsync(ApiUrl, requestBody);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Hugging Face API request failed: {errorContent}");
            }

            // The API returns the raw image data directly, not JSON
            return await response.Content.ReadAsByteArrayAsync();
        }
    }
}
