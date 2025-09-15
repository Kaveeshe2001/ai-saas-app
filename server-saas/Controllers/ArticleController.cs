using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server_saas.Data;
using server_saas.Dto.Articles;
using server_saas.Extentions;
using server_saas.Interfaces;
using server_saas.Mappers;
using server_saas.Models;

namespace server_saas.Controllers
{
    [Route("server_saas/article")]
    [ApiController]
    public class ArticleController : Controller
    {
        private readonly ApplicationDBContext _context;
        private readonly IArticleService _articleService;
        private readonly UserManager<User> _userManager;

        public ArticleController(ApplicationDBContext context, UserManager<User> userManager, IArticleService articleService)
        {
            _context = context;
            _userManager = userManager;
            _articleService = articleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var articles = await _articleService.GetAllArticlesAsync();
            var responseDto = articles.Select(s => s.ToArticleResponseDto()).ToList();

            return Ok(responseDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var article = await _articleService.GetArticleByIdAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            return Ok(article.ToArticleResponseDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GenerateArticle(GenerateArticleRequestDto requestDto)
        {
            var username = User.GetUsername();
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound("User cannot be found");
            }

            try
            {
                var newArticle = await _articleService.CreateArticleAsync(requestDto);
                var responseDto = ArticleMappers.ToArticleResponseDto(newArticle);
                return CreatedAtAction(nameof(GetById), new { id = responseDto.Id }, responseDto);
            } catch (Exception ex)
            {
                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return StatusCode(500, "An error occurred while creating the art: " + errorMessage);
            }
        }
    }
}
