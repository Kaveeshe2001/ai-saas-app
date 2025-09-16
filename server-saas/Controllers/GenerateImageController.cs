using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server_saas.Data;
using server_saas.Dto.GeneratedImage;
using server_saas.Extentions;
using server_saas.Interfaces;
using server_saas.Mappers;
using server_saas.Migrations;
using server_saas.Models;

namespace server_saas.Controllers
{
    [Route("server_saas/generate-images")]
    [ApiController]
    public class GenerateImageController : Controller
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IImageService _imageService;

        public GenerateImageController(ApplicationDBContext context, UserManager<User> userManager, IImageService imageService)
        {
            _context = context;
            _userManager = userManager;
            _imageService = imageService;
        }

        [HttpPost("generate")]
        [Authorize]
        public async Task<IActionResult> GenerateImage([FromBody] GenerateImageRequestDto requestDto)
        {
            var username = User.GetUsername();
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            try
            {
                var newImage = await _imageService.CreateImageAsync(requestDto, user);
                var responseDto = ImageMappers.ToImageResponseDto(newImage);
                return Ok(responseDto);
            } catch (UnauthorizedAccessException ex)
            {
                // Catches the exception for non-premium users trying to use a premium style
                return StatusCode(403, ex.Message);
            } catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred during image generation: {ex.Message}");
            }
        }

        //Get all images that are marked as public
        [HttpGet("public")]
        public async Task<IActionResult> GetPublicImages()
        {
            var images = await _imageService.GetAllPublicImagesAsync();
            var imageDtos = ImageMappers.ToImageResponseDtoList(images);
            return Ok(imageDtos);
        }

        //Gets all images created by the authenticated user
        [HttpGet("my-images")]
        [Authorize]
        public async Task<IActionResult> GetMyImages()
        {
            var user = await _userManager.FindByNameAsync(User.GetUsername());

            if (user == null)
            {
                return Unauthorized();
            }

            var images = await _imageService.GetAllImagesForUserAsync(user.Id);
            var imageDtos = ImageMappers.ToImageResponseDtoList(images);
            return Ok(imageDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userId = User.GetUserId();

            var image = await _imageService.GetImageByIdAsync(id, userId);

            if (image == null)
            {
                return NotFound();
            }

            return Ok(ImageMappers.ToImageResponseDto(image));
        }
    }
}
