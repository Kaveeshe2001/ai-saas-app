using System.ComponentModel.DataAnnotations;

namespace server_saas.Models
{
    public class ResumeReview
    {
        public int Id { get; set; }
        [Required]
        public string OriginalResumeText { get; set; } = string.Empty;
        [Required]
        public string FeedbackText {  get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        [Required]
        public string UserId { get; set; } = string.Empty;
        public User User { get; set; }
    }
}
