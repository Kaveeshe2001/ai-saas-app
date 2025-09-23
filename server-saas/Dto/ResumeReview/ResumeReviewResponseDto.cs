namespace server_saas.Dto.ResumeReview
{
    public class ResumeReviewResponseDto
    {
        public int Id { get; set; }
        public string OriginalResumeText { get; set; }
        public string FeedbackText { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
