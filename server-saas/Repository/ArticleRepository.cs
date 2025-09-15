using Microsoft.EntityFrameworkCore;
using server_saas.Data;
using server_saas.Interfaces;
using server_saas.Models;

namespace server_saas.Repository
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly ApplicationDBContext _context;
        public ArticleRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Article>> GetAllAsync()
        {
            return await _context.Articles.ToListAsync();
        }

        public async Task<Article> CreateAsync(Article articleModel)
        {
            await _context.Articles.AddAsync(articleModel);
            await _context.SaveChangesAsync();
            return articleModel;
        }

        public async Task<Article?> GetByIdAsync(int id)
        {
            return await _context.Articles.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
