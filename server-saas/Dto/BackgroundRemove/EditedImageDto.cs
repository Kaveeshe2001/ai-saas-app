namespace server_saas.Dto.BackgroundRemove
{
    public class EditedImageDto
    {
        public int Id { get; set; }
        public string ProcessedImageUrl { get; set; }
        public string OperationType { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
