using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface IFeedbackRepository
    {
        Task<List<Feedback>> GetAllAsync();
        Task<Feedback?> GetByIdAsync(int id);
        Task<Feedback> CreateAsync(Feedback feedbackModel);
    }
}
