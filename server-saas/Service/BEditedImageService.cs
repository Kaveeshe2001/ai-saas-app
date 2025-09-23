using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using server_saas.Interfaces;
using server_saas.Models;
using server_saas.Repository;
using System.Net.Http.Headers;

namespace server_saas.Service
{
    public class BEditedImageService : IBEditedImageService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly IBEditedImageRepository _editedImageRepo;
        private readonly Cloudinary _cloudinary;
        private const string RemoveBgApiUrl = "https://api-inference.huggingface.co/models/briaai/RMBG-1.4";

        public BEditedImageService(HttpClient httpClient, IConfiguration config, IBEditedImageRepository editedImageRepo)
        {
            _httpClient = httpClient;
            _config = config;
            _editedImageRepo = editedImageRepo;

            Account account = new(
                _config["Cloudinary:CloudName"],
                _config["Cloudinary:ApiKey"],
                _config["Cloudinary:ApiSecret"]
            );
            _cloudinary = new Cloudinary( account );
        }

        public async Task<BEditedImage> RemoveBackgroundAsync(IFormFile imageFile, User user)
        {
            var apiKey = _config["HuggingFace:ApiKey"];
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            using var imageStream = imageFile.OpenReadStream();
            using var content = new StreamContent(imageStream);
            content.Headers.ContentType = new MediaTypeHeaderValue(imageFile.ContentType);

            var aiResponse = await _httpClient.PostAsync(RemoveBgApiUrl, content);
            if (!aiResponse.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Error from Hugging Face API: {await aiResponse.Content.ReadAsStringAsync()}");
            }

            var processedImageBytes = await aiResponse.Content.ReadAsByteArrayAsync();

            // Upload the resulting image bytes to Cloudinary
            await using var processedStream = new MemoryStream(processedImageBytes);
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(imageFile.FileName, processedStream),
                Folder = "edited-images"
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            if (uploadResult.Error != null)
            {
                throw new InvalidOperationException($"Cloudinary upload failed: {uploadResult.Error.Message}");
            }

            // Create a record in your database
            var newBEditedImage = new BEditedImage
            {
                ProcessedImageUrl = uploadResult.SecureUrl.ToString(),
                OperationType = "RemoveBackground",
                UserId = user.Id,
                CreatedAt = DateTime.UtcNow
            };

            return await _editedImageRepo.CreateAsync(newBEditedImage);
        }
    }
}
