using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface IBEditedImageRepository
    {
        Task<BEditedImage> CrerateAsync(BEditedImage image);
        Task<List<BEditedImage>> GetAllByUserIdAsync(string userId);
        Task<BEditedImage?> GetByIdAsync(int id);
    }
}
