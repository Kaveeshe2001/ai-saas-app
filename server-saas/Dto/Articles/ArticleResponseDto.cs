namespace server_saas.Dto.Articles
{
    public class ArticleResponseDto
    {
        public int Id { get; set; }
        public string Topic { get; set; } = string.Empty;
        public string ArticleLength { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
