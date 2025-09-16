using System.ComponentModel.DataAnnotations;

namespace server_saas.Dto.GeneratedImage
{
    public class GenerateImageRequestDto
    {
        [Required]
        [MinLength(10)]
        [MaxLength(1000)]
        public string Prompt { get; set; } = string.Empty;
        [Required]
        public string Style { get; set; } = string.Empty;
        public bool IsPublic { get; set; }
    }
}
