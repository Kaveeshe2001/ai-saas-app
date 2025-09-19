using Newtonsoft.Json.Linq;
using server_saas.Dto.GeneratedImage;
using server_saas.Interfaces;
using server_saas.Models;
using System.Buffers.Text;

namespace server_saas.Service
{
    public class ImageService : IImageService
    {
        private readonly IGeneratedImageRepository _imageRepo;
        private readonly IGeminiAIService _geminiService;
        private readonly IHuggingFaceService _huggingFaceService;

        private static readonly List<string> PremiumStyles = new()
        {
            "Ghibli style", "Fantasy style", "3D style", "Cinematic"
        };

        public ImageService(IGeneratedImageRepository imageRepo, IGeminiAIService geminiService, IHuggingFaceService huggingFaceService)
        {
            _imageRepo = imageRepo;
            _geminiService = geminiService;
            _huggingFaceService = huggingFaceService;
        }

        public async Task<GeneratedImage> CreateImageAsync(GenerateImageRequestDto requestDto, User user)
        {
            if (PremiumStyles.Contains(requestDto.Style) && !user.IsPremium)
            {
                throw new UnauthorizedAccessException("This style is available for premium users only.");
            }

            //Generate Image from AI
            var imageBytes = await _huggingFaceService.GenerateImageAsync(requestDto.Prompt, requestDto.Style);

            //Convert the raw bytes to a Base64 string
            var base64Image = Convert.ToBase64String(imageBytes);

            //Format as a Data URI to be used directly in an img tag
            var imageUrl = $"data:image/png;base64,{base64Image}";

            //Create the entity
            var newImage = new GeneratedImage
            {
                Prompt = requestDto.Prompt,
                Style = requestDto.Style,
                IsPublic = requestDto.IsPublic,
                ImageUrl = imageUrl,
                UserId = user.Id,
                CreatedAt = DateTime.UtcNow
            };

            await _imageRepo.CreateAsync(newImage);
            return newImage;
        }

        public async Task<List<GeneratedImage>> GetAllPublicImagesAsync()
        {
            return await _imageRepo.GetAllPublicAsync();
        }

        public async Task<List<GeneratedImage>> GetAllImagesForUserAsync(string userId)
        {
            return await _imageRepo.GetAllByUserIdAsync(userId);
        }

        public async Task<GeneratedImage?> GetImageByIdAsync(int id, string? userId)
        {
            var image = await _imageRepo.GetByIdAsync(id);

            if (image == null)
            {
                return null;
            }

            if (image.IsPublic || image.UserId == userId)
            {
                return image;
            }

            // If the image is private and the user is not the owner, deny access.
            return null;
        }

        public async Task<GeneratedImage> SaveImageRecordAsync(SaveImageRequestDto requestDto, User user)
        {
            var newImage = new GeneratedImage
            {
                Prompt = requestDto.Prompt,
                Style = requestDto.Style,
                ImageUrl = requestDto.ImageUrl,
                IsPublic = requestDto.IsPublic,
                UserId = user.Id,
                CreatedAt = DateTime.UtcNow
            };

            return await _imageRepo.CreateAsync(newImage);
        }
    }
}
