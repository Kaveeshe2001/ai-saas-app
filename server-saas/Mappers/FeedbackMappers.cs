using server_saas.Dto.Feedback;
using server_saas.Models;

namespace server_saas.Mappers
{
    public static class FeedbackMappers
    {
        public static FeedbackDto ToFeedbackDto(this Feedback feedbackModel) 
        {
            return new FeedbackDto
            {
                Id = feedbackModel.Id,
                Email = feedbackModel.Email,
            };
        }

        public static Feedback ToFeedbackFromCreate(this CreateFeedbackDto createFeedbackModel)
        {
            return new Feedback
            {
                Email = createFeedbackModel.Email,
            };
        } 
    }
}
