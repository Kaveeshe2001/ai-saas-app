using server_saas.Interfaces;

namespace server_saas.Service
{
    public class ClipDropService : IClipDropService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;
        private readonly ILogger<ClipDropService> _logger;

        private const string ApiUrl = "https://clipdrop-api.co/text-to-image/v1";

        //Create a style mapping dictionaries
        private static readonly Dictionary<string, string> StyleMap = new()
        {
            // Free Styles
            { "realistic", "photographic" },
            { "anime style", "anime" },
            { "cartoon style", "comic book" },
            { "portrait style", "photographic" },
            { "line art", "line art" },

            // Premium Styles
            { "ghibli style", "anime" },
            { "fantasy style", "fantasy" },
            { "3d style", "digital art" },
            { "cinematic", "cinematic" }
        };

        public ClipDropService(IHttpClientFactory httpClientFactory, IConfiguration config, ILogger<ClipDropService> logger)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
            _logger = logger;
        }

        public async Task<byte[]> GenerateImageAsync(string prompt, string style)
        {
            var apiKey = _config["ClipDrop:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new InvalidOperationException("ClipDrop API key is not configured.");
            }

            //Check what data we're working with
            _logger.LogInformation("Received style from ImageService: '{Style}'", style);

            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("x-api-key", apiKey);

            var apiStylePreset = StyleMap.GetValueOrDefault(style.ToLower(), "photographic");

            _logger.LogInformation("Mapped to API style preset: '{ApiStylePreset}'", apiStylePreset);

            // ClipDrop uses multipart/form-data for its request
            using var formData = new MultipartFormDataContent();
            formData.Add(new StringContent(prompt), "prompt");
            formData.Add(new StringContent(apiStylePreset), "style_preset");

            // Send the request
            var response = await client.PostAsync(ApiUrl, formData);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError("ClipDrop API failed. Status: {StatusCode}, Content: {ErrorContent}", response.StatusCode, errorContent);
                throw new HttpRequestException($"ClipDrop API request failed with status code {response.StatusCode}: {errorContent}");
            }

            // The API returns the raw image data directly, not JSON
            return await response.Content.ReadAsByteArrayAsync();
        }
    }
}
