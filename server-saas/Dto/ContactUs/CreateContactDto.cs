using System.ComponentModel.DataAnnotations;

namespace server_saas.Dto.ContactUs
{
    public class CreateContactDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
