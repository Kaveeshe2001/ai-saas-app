using System.ComponentModel.DataAnnotations;

namespace server_saas.Models
{
    public class GeneratedImage
    {
        public int Id { get; set; }
        [Required]
        public string Prompt { get; set; } = string.Empty;
        [Required]
        public string Style { get; set; } = string.Empty;
        public bool IsPublic { get; set; }
        [Required]
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public int Likes { get; set; }
        public string UserId { get; set; } = string.Empty;
        public User User { get; set; } = null!;
        public ICollection<ImageLike> ImageLikes { get; set; } = new List<ImageLike>();
    }
}
