using server_saas.Dto.Articles;
using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface IArticleService
    {
        Task<Article> CreateArticleAsync(GenerateArticleRequestDto requestDto);
    }
}
