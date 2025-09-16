using server_saas.Dto.GeneratedImage;
using server_saas.Models;

namespace server_saas.Mappers
{
    public static class ImageMappers
    {
        //Converts a single GeneratedImage entity to its DTO representation.
        public static ImageResponseDto ToImageResponseDto(GeneratedImage image)
        {
            return new ImageResponseDto
            {
                Id = image.Id,
                Prompt = image.Prompt,
                Style = image.Style,
                IsPublic = image.IsPublic,
                ImageUrl = image.ImageUrl,
                CreatedAt = image.CreatedAt
            };
        }

        //Convert a list of GeneratedImage entities
        public static List<ImageResponseDto> ToImageResponseDtoList(IEnumerable<GeneratedImage> images)
        {
            return images.Select(ToImageResponseDto).ToList();
        }
    }
}
