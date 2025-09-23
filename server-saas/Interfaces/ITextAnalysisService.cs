using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface ITextAnalysisService
    {
        Task<ResumeReview> ReviewResumeAndSaveAsync(string resumeText, User user);
        Task<ResumeReview> ReviewResumeAndSaveAsync(IFormFile resumeFile, User user);
        Task<List<ResumeReview>> GetAllReviewsForUserAsync(string userId);
        Task<ResumeReview?> GetReviewByIdAsync(int id);
    }
}
