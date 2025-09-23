using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface IResumeReviewRepository
    {
        Task<ResumeReview> CreateAsync(ResumeReview review);
        Task<List<ResumeReview>> GetAllAsync();
        Task<ResumeReview?> GetByIdAsync(int id);

    }
}
