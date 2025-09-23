using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server_saas.Interfaces;
using server_saas.Mappers;
using server_saas.Models;

namespace server_saas.Controllers
{
    [Route("server_saas/image-editing")]
    [ApiController]
    public class BEditedImageController : Controller
    {
        private readonly IBEditedImageService _imageEditingService;
        private readonly UserManager<User> _userManager;

        public BEditedImageController(IBEditedImageService imageEditingService, UserManager<User> userManager)
        {
            _imageEditingService = imageEditingService;
            _userManager = userManager;
        }

        [HttpPost("remove-background")]
        [Authorize]
        public async Task<IActionResult> RemoveBackground(IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0) return BadRequest("No image file provided.");

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            try
            {
                var newImageRecord = await _imageEditingService.RemoveBackgroundAsync(imageFile, user);
                var responseDto = BEditedImageMappers.ToBEditedImageDto(newImageRecord);
                return Ok(responseDto);
            } catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
