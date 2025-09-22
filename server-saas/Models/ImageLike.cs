namespace server_saas.Models
{
    public class ImageLike
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public int GeneratedImageId { get; set; }
        public GeneratedImage GeneratedImage { get; set; }
    }
}
