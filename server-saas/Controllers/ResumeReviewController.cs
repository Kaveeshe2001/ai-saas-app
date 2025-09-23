using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server_saas.Interfaces;
using server_saas.Mappers;
using server_saas.Models;
using server_saas.Service;

namespace server_saas.Controllers
{
    [Route("server_saas/review-resume")]
    [ApiController]
    public class ResumeReviewController : Controller
    {
        private readonly ITextAnalysisService _textAnalysisService;
        private readonly UserManager<User> _userManager;

        public ResumeReviewController(ITextAnalysisService textAnalysisService, UserManager<User> userManager)
        {
            _textAnalysisService = textAnalysisService;
            _userManager = userManager;
        }

        [HttpPost("upload")]
        [Authorize]
        public async Task<IActionResult> ReviewResumeFromFile(IFormFile resumeFile)
        {
            if (resumeFile == null || resumeFile.Length == 0) return BadRequest("No resume file provided.");

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            try
            {
                var newReview = await _textAnalysisService.ReviewResumeAndSaveAsync(resumeFile, user);
                var responseDto = ResumeReviewMapper.ToResumeReviewResponseDto(newReview);
                return CreatedAtAction(nameof(GetReviewById), new { id = responseDto.Id }, responseDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("my-reviews")]
        [Authorize]
        public async Task<IActionResult> GetMyReview()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var reviews = await _textAnalysisService.GetAllReviewsForUserAsync(user.Id);
            var reviewDtos = reviews.Select(ResumeReviewMapper.ToResumeReviewResponseDto);
            return Ok(reviewDtos);
        }

        [HttpGet("my-reviews/{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetReviewById(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var review = await _textAnalysisService.GetReviewByIdAsync(id);
            if (review == null) return NotFound();
            if (review.UserId != user.Id) return Forbid();

            return Ok(ResumeReviewMapper.ToResumeReviewResponseDto(review));
        }
    }
}
