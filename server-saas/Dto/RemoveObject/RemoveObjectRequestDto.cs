using System.ComponentModel.DataAnnotations;

namespace server_saas.Dto.RemoveObject
{
    public class RemoveObjectRequestDto
    {
        [Required]
        public IFormFile ImageFile { get; set; }

        [Required]
        public IFormFile MaskFile { get; set; }
    }
}
