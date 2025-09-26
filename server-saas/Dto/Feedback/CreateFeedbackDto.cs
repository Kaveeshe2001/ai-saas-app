using System.ComponentModel.DataAnnotations;

namespace server_saas.Dto.Feedback
{
    public class CreateFeedbackDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;
    }
}
