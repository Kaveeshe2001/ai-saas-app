using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server_saas.Data;
using server_saas.Dto.Articles;
using server_saas.Interfaces;
using server_saas.Models;
using System.Web.Http;

namespace server_saas.Controllers
{
    [Route("server_saas/article")]
    [ApiController]
    public class ArticleController : Controller
    {
        private readonly ApplicationDBContext _context;
        private readonly IArticleRepository _articleRepo;
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

        }

        [HttpPost]
        [ProducesResponseType(typeof(ArticleResponseDto), 201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GenerateArticle([FromBody] GenerateArticleRequestDto requestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newArticle = await _articleService.CreateArticleAsync(requestDto);
        }
    }
}
