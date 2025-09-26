using Microsoft.AspNetCore.Mvc;
using server_saas.Dto.Feedback;
using server_saas.Interfaces;
using server_saas.Mappers;

namespace server_saas.Controllers
{
    [Route("server_saas/feedback")]
    [ApiController]
    public class FeedbackController : Controller
    {
        private readonly IFeedbackRepository _feedbackRepo;

        public FeedbackController(IFeedbackRepository feedbackRepo)
        {
            _feedbackRepo = feedbackRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var feedback = await _feedbackRepo.GetAllAsync();
            var feedbackDto = feedback.Select(s => s.ToFeedbackDto());
            return Ok(feedbackDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var feedback = await _feedbackRepo.GetByIdAsync(id);

            if (feedback == null)
            {
                return NotFound();
            }

            return Ok(feedback.ToFeedbackDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateFeedbackDto feedbackDto)
        {
            var feedbackModel = feedbackDto.ToFeedbackFromCreate();
            await _feedbackRepo.CreateAsync(feedbackModel);
            return CreatedAtAction(nameof(GetById), new { id = feedbackModel.Id }, feedbackModel.ToFeedbackDto());
        }
    }
}
