using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_saas.Models
{
    [Table("Contact")]
    public class Article
    {
        [Key]
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
