using System.ComponentModel.DataAnnotations;

namespace server_saas.Models
{
    public class EditedImage
    {
        public int Id { get; set; }
        [Required]
        public string OriginalImageUrl { get; set; }
        [Required]
        public string ProcessedImageUrl { get; set; }
        [Required]
        public string OperationType { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; } = string.Empty;
        public User User { get; set; }
    }
}
