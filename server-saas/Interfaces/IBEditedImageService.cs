using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface IBEditedImageService
    {
        Task<BEditedImage> RemoveBackgroundAsync(IFormFile imageFile, User user);
    }
}
