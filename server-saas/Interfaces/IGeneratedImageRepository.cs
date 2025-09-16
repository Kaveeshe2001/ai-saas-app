using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface IGeneratedImageRepository
    {
        Task<List<GeneratedImage>> GetAllPublicAsync();
        Task<List<GeneratedImage>> GetAllByUserIdAsync(string userId);
        Task<GeneratedImage?> GetByIdAsync(int id);
        Task<GeneratedImage> CreateAsync(GeneratedImage image);
    }
}
