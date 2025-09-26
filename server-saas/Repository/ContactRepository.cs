using Microsoft.EntityFrameworkCore;
using server_saas.Data;
using server_saas.Interfaces;
using server_saas.Models;

namespace server_saas.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly ApplicationDBContext _context;

        public ContactRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<ContactUs>> GetAllAsync()
        {
            return await _context.Contactus.ToListAsync();
        }

        public async Task<ContactUs> CreateAsync(ContactUs contactModel)
        {
            await _context.Contactus.AddAsync(contactModel);
            await _context.SaveChangesAsync();
            return contactModel;
        }

        public async Task<ContactUs?> GetByIdAsync(int id)
        {
            return await _context.Contactus.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
