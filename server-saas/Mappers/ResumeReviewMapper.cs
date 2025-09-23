using server_saas.Dto.ResumeReview;
using server_saas.Models;

namespace server_saas.Mappers
{
    public static class ResumeReviewMapper
    {
        public static ResumeReviewResponseDto ToResumeReviewResponseDto(ResumeReview review)
        {
            return new ResumeReviewResponseDto
            {
                Id = review.Id,
                OriginalResumeText = review.OriginalResumeText,
                FeedbackText = review.FeedbackText,
                CreatedAt = review.CreatedAt
            };
        }
    }
}
