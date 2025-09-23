using server_saas.Dto.BackgroundRemove;
using server_saas.Models;

namespace server_saas.Mappers
{
    public static class BEditedImageMappers
    {
        public static BEditedImageDto ToBEditedImageDto(BEditedImage bEditedImage)
        {
            return new BEditedImageDto
            {
                Id = bEditedImage.Id,
                ProcessedImageUrl = bEditedImage.ProcessedImageUrl,
                OperationType = bEditedImage.OperationType,
                CreatedAt = bEditedImage.CreatedAt,
            };
        }
    }
}
