using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server_saas.Dto.RemoveObject;
using server_saas.Extentions;
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

            var username = User.GetUsername();
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound("User cannot be found");
            }

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
        public async Task<IActionResult> RemoveObject([FromForm] RemoveObjectRequestDto requestDto)
        {
            if (requestDto.ImageFile == null || requestDto.MaskFile == null)
            {
                return BadRequest("Both an image file and a mask file are required.");
            }

            var username = User.GetUsername();
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound("User cannot be found");
            }

            try
            {
                var newImageRecord = await _imageEditingService.RemoveObjectAsync(requestDto.ImageFile, requestDto.MaskFile, user);
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
