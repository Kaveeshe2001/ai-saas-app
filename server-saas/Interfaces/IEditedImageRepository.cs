using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface IEditedImageRepository
    {
        Task<EditedImage> CreateAsync(EditedImage image);
        Task<List<EditedImage>> GetAllByUserIdAsync(string userId);
        Task<EditedImage?> GetByIdAsync(int id);
    }
}
