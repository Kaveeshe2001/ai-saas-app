using server_saas.Dto.Articles;
using server_saas.Models;

namespace server_saas.Mappers
{
    public static class ArticleMappers
    {
        public static ArticleResponseDto ToArticleResponseDto(Article article)
        {
            return new ArticleResponseDto
            {
                Id = article.Id,
                Topic = article.Topic,
                ArticleLength = article.ArticleLength,
                Content = article.Content,
                CreatedAt = article.CreatedAt
            };
        }
    }
}
