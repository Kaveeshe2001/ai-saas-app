using System.ComponentModel.DataAnnotations;

namespace server_saas.Dto.Articles
{
    public class GenerateArticleRequestDto
    {
        [Required]
        [MinLength(5)]
        [MaxLength(200)]
        public string Topic { get; set; } = string.Empty;
        [Required]
        public string Articlelength { get; set; } = string.Empty;
    }
}
