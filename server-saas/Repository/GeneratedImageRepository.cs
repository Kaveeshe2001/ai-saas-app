using Microsoft.EntityFrameworkCore;
using server_saas.Data;
using server_saas.Interfaces;
using server_saas.Models;

namespace server_saas.Repository
{
    public class GeneratedImageRepository : IGeneratedImageRepository
    {
        private readonly ApplicationDBContext _context;

        public GeneratedImageRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<GeneratedImage>> GetAllPublicAsync()
        {
            return await _context.GeneratedImages
                .Where(img => img.IsPublic)
                .OrderByDescending(img => img.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<GeneratedImage>> GetAllByUserIdAsync(string userId)
        {
            return await _context.GeneratedImages
                .Where (img => img.UserId == userId)
                .OrderByDescending(img => img.CreatedAt)
                .ToListAsync();
        }

        public async Task<GeneratedImage?> GetByIdAsync(int id)
        {
            return await _context.GeneratedImages.FirstOrDefaultAsync(img => img.Id == id);
        }

        public async Task<GeneratedImage> CreateAsync(GeneratedImage image)
        {
            await _context.GeneratedImages.AddAsync(image);
            await _context.SaveChangesAsync();
            return image;
        }
    }
}
