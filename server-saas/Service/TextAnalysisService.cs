using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;
using server_saas.Interfaces;
using server_saas.Models;
using System.Text;
using System.Text.Json;

namespace server_saas.Service
{
    public class TextAnalysisService : ITextAnalysisService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly IResumeReviewRepository _reviewRepo;

        public TextAnalysisService(HttpClient httpClient, IConfiguration config, IResumeReviewRepository reviewRepo)
        {
            _httpClient = httpClient;
            _config = config;
            _reviewRepo = reviewRepo;
        }

        public async Task<ResumeReview> ReviewResumeAndSaveAsync(IFormFile resumeFile, User user)
        {
            string extractedText;
            try
            {
                using (var pdfDocument = UglyToad.PdfPig.PdfDocument.Open(resumeFile.OpenReadStream()))
                {
                    var textBuilder = new StringBuilder();
                    foreach (Page page in pdfDocument.GetPages())
                    {
                        textBuilder.Append(page.Text);
                        textBuilder.Append("\n\n");
                    }
                    extractedText = textBuilder.ToString();
                }
            } catch (Exception ex)
            {
                throw new InvalidOperationException("Could not read text from the provided PDF file.", ex);
            }

            if (string.IsNullOrWhiteSpace(extractedText))
            {
                throw new InvalidOperationException("The provided PDF appears to be empty or contains no readable text.");
            }

            return await ReviewResumeAndSaveAsync(extractedText, user);
        }

        //Call the AI

        private async Task<string> GenerateFeedbackFromAIAsync(string resumeText)
        {
            var apiKey = _config["Gemini:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new InvalidOperationException("Gemini API key is not configured.");
            }

            var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={apiKey}";
            var prompt = $"Act as a professional career coach... Here is the resume:\n\n{resumeText}";
            var payload = new { contents = new[] { new { parts = new[] { new { text = prompt } } } } };
            var jsonPayload = JsonSerializer.Serialize(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(url, content);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Error from Gemini API: {await response.Content.ReadAsStringAsync()}");
            }

            using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            return doc.RootElement.GetProperty("candidates")[0].GetProperty("content").GetProperty("parts")[0].GetProperty("text").GetString() ?? "";
        }

        public async Task<ResumeReview> ReviewResumeAndSaveAsync(string resumeText, User user)
        {
            var feedback = await GenerateFeedbackFromAIAsync(resumeText);
            var newReview = new ResumeReview
            {
                OriginalResumeText = resumeText,
                FeedbackText = feedback,
                UserId = user.Id,
                CreatedAt = DateTime.UtcNow
            };
            return await _reviewRepo.CreateAsync(newReview);
        }

        public async Task<List<ResumeReview>> GetAllReviewsForUserAsync(string userId)
        {
            return await _reviewRepo.GetAllByUserIdAsync(userId);
        }

        public async Task<ResumeReview?> GetReviewByIdAsync(int id)
        {
            return await _reviewRepo.GetByIdAsync(id);
        }
    }
}
