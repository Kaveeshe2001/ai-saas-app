using Microsoft.EntityFrameworkCore;
using server_saas.Data;
using server_saas.Interfaces;
using server_saas.Models;

namespace server_saas.Repository
{
    public class ResumeReviewRepository : IResumeReviewRepository
    {
        private readonly ApplicationDBContext _context;

        public ResumeReviewRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<ResumeReview>> GetAllAsync()
        {
            return await _context.ResumeReviews.ToListAsync();
        }

        public async Task<ResumeReview> CreateAsync(ResumeReview review)
        {
            await _context.ResumeReviews.AddAsync(review);
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<List<ResumeReview>> GetAllByUserIdAsync(string userId)
        {
            return await _context.ResumeReviews
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<ResumeReview?> GetByIdAsync(int id)
        {
            return await _context.ResumeReviews.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
