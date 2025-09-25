using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using server_saas.Interfaces;
using server_saas.Models;
using System.Net.Http.Headers;

namespace server_saas.Service;

public class ImageEditingService : IImageEditingService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    private readonly IEditedImageRepository _editedImageRepo;
    private readonly Cloudinary _cloudinary;

    // Using the stable ClipDrop API endpoints
    private const string RemoveBgApiUrl = "https://clipdrop-api.co/remove-background/v1";
    private const string InpaintingApiUrl = "https://clipdrop-api.co/inpaint/v1";

    public ImageEditingService(HttpClient httpClient, IConfiguration config, IEditedImageRepository editedImageRepo)
    {
        _httpClient = httpClient;
        _config = config;
        _editedImageRepo = editedImageRepo;

        Account account = new(
            _config["Cloudinary:CloudName"],
            _config["Cloudinary:ApiKey"],
            _config["Cloudinary:ApiSecret"]
        );
        _cloudinary = new Cloudinary(account);
    }

    public async Task<EditedImage> RemoveBackgroundAsync(IFormFile imageFile, User user)
    {
        var apiKey = _config["ClipDrop:ApiKey"];
        if (string.IsNullOrEmpty(apiKey))
        {
            throw new InvalidOperationException("ClipDrop API key is not configured.");
        }

        using var request = new HttpRequestMessage(System.Net.Http.HttpMethod.Post, RemoveBgApiUrl);
        request.Headers.Add("x-api-key", apiKey);

        using var content = new MultipartFormDataContent();
        content.Add(new StreamContent(imageFile.OpenReadStream()), "image_file", imageFile.FileName);
        request.Content = content;

        var aiResponse = await _httpClient.SendAsync(request);
        if (!aiResponse.IsSuccessStatusCode)
        {
            throw new HttpRequestException($"Error from ClipDrop API: {await aiResponse.Content.ReadAsStringAsync()}");
        }

        var processedImageBytes = await aiResponse.Content.ReadAsByteArrayAsync();

        return await UploadAndSaveAsync(processedImageBytes, imageFile.FileName, "RemoveBackground", user);
    }

    public async Task<EditedImage> RemoveObjectAsync(IFormFile imageFile, IFormFile maskFile, User user)
    {
        var apiKey = _config["ClipDrop:ApiKey"];
        if (string.IsNullOrEmpty(apiKey))
        {
            throw new InvalidOperationException("ClipDrop API key is not configured.");
        }

        using var request = new HttpRequestMessage(System.Net.Http.HttpMethod.Post, InpaintingApiUrl);
        request.Headers.Add("x-api-key", apiKey);

        using var content = new MultipartFormDataContent();
        content.Add(new StreamContent(imageFile.OpenReadStream()), "image_file", imageFile.FileName);
        content.Add(new StreamContent(maskFile.OpenReadStream()), "mask_file", maskFile.FileName);
        request.Content = content;

        var aiResponse = await _httpClient.SendAsync(request);
        if (!aiResponse.IsSuccessStatusCode)
        {
            throw new HttpRequestException($"Error from ClipDrop API: {await aiResponse.Content.ReadAsStringAsync()}");
        }

        var processedImageBytes = await aiResponse.Content.ReadAsByteArrayAsync();

        return await UploadAndSaveAsync(processedImageBytes, imageFile.FileName, "RemoveObject", user);
    }

    private async Task<EditedImage> UploadAndSaveAsync(byte[] imageBytes, string fileName, string operationType, User user)
    {
        await using var processedStream = new MemoryStream(imageBytes);
        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(fileName, processedStream),
            Folder = "edited-images"
        };
        var uploadResult = await _cloudinary.UploadAsync(uploadParams);
        if (uploadResult.Error != null)
        {
            throw new InvalidOperationException($"Cloudinary upload failed: {uploadResult.Error.Message}");
        }

        var newEditedImage = new EditedImage
        {
            ProcessedImageUrl = uploadResult.SecureUrl.ToString(),
            OperationType = operationType,
            UserId = user.Id,
            CreatedAt = DateTime.UtcNow
        };

        return await _editedImageRepo.CreateAsync(newEditedImage);
    }
}