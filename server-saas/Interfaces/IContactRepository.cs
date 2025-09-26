using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface IContactRepository
    {
        Task<List<ContactUs>> GetAllAsync();
        Task<ContactUs?> GetByIdAsync(int id);
        Task<ContactUs> CreateAsync(ContactUs contactModel);
    }
}
