using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface IImageEditingService
    {
        Task<EditedImage> RemoveBackgroundAsync(IFormFile imageFile, User user);
        Task<EditedImage> RemoveObjectAsync(IFormFile imageFile, IFormFile maskFile, User user);
    }
}
