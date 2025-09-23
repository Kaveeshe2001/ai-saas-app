using server_saas.Dto.BackgroundRemove;
using server_saas.Models;

namespace server_saas.Mappers
{
    public static class EditedImageMappers
    {
        public static EditedImageDto ToEditedImageDto(EditedImage bEditedImage)
        {
            return new EditedImageDto
            {
                Id = bEditedImage.Id,
                ProcessedImageUrl = bEditedImage.ProcessedImageUrl,
                OperationType = bEditedImage.OperationType,
                CreatedAt = bEditedImage.CreatedAt,
            };
        }
    }
}
