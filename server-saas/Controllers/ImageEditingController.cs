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
    public class ImageEditingController : Controller
    {
        private readonly IImageEditingService _imageEditingService;
        private readonly UserManager<User> _userManager;

        public ImageEditingController(IImageEditingService imageEditingService, UserManager<User> userManager)
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
                var responseDto = EditedImageMappers.ToEditedImageDto(newImageRecord);
                return Ok(responseDto);
            } catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("remove-object")]
        [Authorize]
        public async Task<IActionResult> RemoveObject([FromForm] IFormFile imageFile, [FromForm] IFormFile maskFile)
        {
            if (imageFile == null || maskFile == null)
            {
                return BadRequest("Both an image file and a mask file are required.");
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            try
            {
                var newImageRecord = await _imageEditingService.RemoveObjectAsync(imageFile, maskFile, user);
                var responseDto = EditedImageMappers.ToEditedImageDto(newImageRecord);
                return Ok(responseDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
