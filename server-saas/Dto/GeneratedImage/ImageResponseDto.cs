namespace server_saas.Dto.GeneratedImage
{
    public class ImageResponseDto
    {
        public int Id { get; set; }
        public string Prompt { get; set; } = string.Empty;
        public string Style { get; set; } = string.Empty;
        public bool IsPublic { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
