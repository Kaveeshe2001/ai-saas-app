using server_saas.Dto.ContactUs;
using server_saas.Models;

namespace server_saas.Mappers
{
    public static class ContactMappers
    {
        public static ContactDto ToContactDto(this ContactUs contactModel)
        {
            return new ContactDto
            {
                Id = contactModel.Id,
                Name = contactModel.Name,
                Email = contactModel.Email,
                Subject = contactModel.Subject,
                Message = contactModel.Message,
            };
        }

        public static ContactUs ToContactFromCreate(this CreateContactDto createContactDto)
        {
            return new ContactUs
            {
                Name = createContactDto.Name,
                Email = createContactDto.Email,
                Subject = createContactDto.Subject,
                Message = createContactDto.Message,
            };
        }
    }
}
