using System.ComponentModel.DataAnnotations;

namespace server_saas.Models
{
    public class Article
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(200)]
        public string Topic { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
        [Required]
        public string ArticleLength { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
