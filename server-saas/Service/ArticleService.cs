using server_saas.Dto.Articles;
using server_saas.Interfaces;
using server_saas.Models;

namespace server_saas.Service
{
    public class ArticleService : IArticleService
    {
        private readonly IGeminiAIService _geminiService;
        private readonly IArticleRepository _articleRepo;

        public ArticleService(IGeminiAIService geminiService, IArticleRepository articleRepo)
        {
            _geminiService = geminiService;
            _articleRepo = articleRepo;
        }

        public async Task<Article> CreateArticleAsync(GenerateArticleRequestDto requestDto)
        {
            //Generate content from AI
            var content = await _geminiService.GenerateArticleContentAsync(
                requestDto.Topic,
                requestDto.Articlelength
            );

            //Create a new Article entity
            var newArticle = new Article
            {
                Topic = requestDto.Topic,
                ArticleLength = requestDto.Articlelength,
                Content = content,
                CreatedAt = DateTime.UtcNow
            };

            //Save it to DB
            await _articleRepo.CreateAsync( newArticle );

            return newArticle;
        }
    }
}
