using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface IArticleRepository
    {
        Task<List<Article>> GetAllAsync();
        Task<Article?> GetByIdAsync(int id);
        Task<Article> CreateAsync(Article articleModel); 
    }
}
