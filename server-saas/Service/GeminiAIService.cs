using Microsoft.EntityFrameworkCore.Metadata.Internal;
using server_saas.Interfaces;
using server_saas.Models;
using System.Collections.Generic;
using System.ComponentModel;
using System.Numerics;
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

        //Generate Article
        public async Task<string> GenerateArticleContentAsync(string topic, string articleLength)
        {
            var apiKey = _config["Gemini:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new InvalidOperationException("Gemini API key is not configured");
            }

            var apiUrl = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={apiKey}";
            var client = _httpClientFactory.CreateClient();

            var promptText = $@"You are an expert blog author and content creator known for writing clear, engaging, and well-structured articles.

            Your task is to write a {articleLength} article on the topic: '{topic}'.

            Please adhere to the following structure and formatting guidelines:
            1.  **Overall Structure:** Start with a captivating introduction, explore 3-4 key subtopics in the body, and end with a strong concluding summary.
            2.  **Formatting:** Use Markdown for all formatting.
                - The main title should be a Level 1 Heading and bold (e.g. My Article Title).
                - Each subtopic must be a Level 2 Heading bold (e.g. My Subtopic).
                - Use **bold** for key terms and important concepts.
                - Include at least one bulleted list or numbered list to present steps, tips, or benefits.
            3.  **Tone:** Write in a professional, informative, and engaging tone that is easy for a general audience to understand.
            ";

            var requestBody = new
            {
                contents = new[]
                {
                    new { parts = new[] { new { text = promptText } } }
                },
                generationConfig = new // All settings go inside this object
                {
                    temperature = 0.7
                }
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

        //Generate Image
        /*public async Task<string> GenerateImageAsBase64Async(string prompt, string style)
        {
            var apiKey = _config["Gemini:ApiKey"];
            var projectId = _config["Gemini:ProjectId"];
            var location = _config["Gemini:Location"];

            if (string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(projectId) || string.IsNullOrEmpty(location))
            {
                throw new InvalidOperationException("Gemini ProjectId, Location, or ApiKey is not configured.");
            }

            var apiUrl = $"https://{location}-aiplatform.googleapis.com/v1/projects/{projectId}/locations/{location}/publishers/google/models/imagegeneration@006:predict";

            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new("Bearer", apiKey);

            var enhancedPrompt = $"{prompt}, {style} style";

            var requestBody = new
            {
                instances = new[]
                {
                    new { prompt = enhancedPrompt },
                },
                parameters = new
                {
                    sampleCount = 1,
                }
            };

            //send requestbody to Gemini API endpoint
            var response = await client.PostAsJsonAsync(apiUrl, requestBody);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Image generation API request failed: {errorContent}");
            }

            //parses the JSON response to navigate to the image data
            using var jsonDoc = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
            var predictions = jsonDoc.RootElement.GetProperty("predictions");
            var firstPrediction = predictions[0];
            var base64Image = firstPrediction.GetProperty("bytesBase64Encoded").GetString();

            return base64Image ?? string.Empty;
        }*/
    }
}
