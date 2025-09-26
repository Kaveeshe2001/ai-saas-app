using Microsoft.AspNetCore.Mvc;
using server_saas.Data;
using server_saas.Dto.ContactUs;
using server_saas.Interfaces;
using server_saas.Mappers;

namespace server_saas.Controllers
{
    [Route("server_saas/contact")]
    [ApiController]
    public class ContactController : Controller
    {
        private readonly ApplicationDBContext _context;
        private readonly IContactRepository _contactRepo;
        public ContactController(ApplicationDBContext context, IContactRepository contactRepo)
        {
            _context = context;
            _contactRepo = contactRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetALl()
        {
            var contact = await _contactRepo.GetAllAsync();
            var contactDto = contact.Select(s => s.ToContactDto());
            return Ok(contactDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var contact = await _contactRepo.GetByIdAsync(id);

            if(contact == null)
            {
                return NotFound();
            }

            return Ok(contact.ToContactDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateContactDto contactDto)
        {
            var contactModel = contactDto.ToContactFromCreate();
            await _contactRepo.CreateAsync(contactModel);
            return CreatedAtAction(nameof(GetById), new { id = contactModel.Id }, contactModel.ToContactDto());
        }
    }
}
