using server_saas.Dto.GeneratedImage;
using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface IImageService
    {
        Task<List<GeneratedImage>> GetAllPublicImagesAsync();
        Task<List<GeneratedImage>> GetAllImagesForUserAsync(string userId);
        Task<GeneratedImage?> GetImageByIdAsync(int id, string userId);
        Task<GeneratedImage> CreateImageAsync(GenerateImageRequestDto requestDto, User user);
    }
}
