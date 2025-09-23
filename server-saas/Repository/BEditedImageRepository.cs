using Microsoft.EntityFrameworkCore;
using server_saas.Data;
using server_saas.Interfaces;
using server_saas.Models;

namespace server_saas.Repository
{
    public class BEditedImageRepository : IBEditedImageRepository
    {
        private readonly ApplicationDBContext _context;

        public BEditedImageRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<BEditedImage> CreateAsync(BEditedImage image)
        {
            await _context.BeditedImages.AddAsync(image);
            await _context.SaveChangesAsync();
            return image;
        }

        public async Task<List<BEditedImage>> GetAllByUserIdAsync(string userId)
        {
            return await _context.BeditedImages
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }

        public async Task<BEditedImage?> GetByIdAsync(int id)
        {
            return await _context.BeditedImages.FirstOrDefaultAsync(x => x.Id == id);
        } 
    }
}
