using CloudinaryDotNet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace server_saas.Controllers
{
    [Route("server_saas/cloudinary")]
    [ApiController]
    public class CloudinaryController : Controller
    {
        private readonly IConfiguration _config;
        private readonly Cloudinary _cloudinary;

        public CloudinaryController(IConfiguration config)
        {
            _config = config;

            Account account = new(
               _config["Cloudinary:CloudName"],
               _config["Cloudinary:ApiKey"],
               _config["Cloudinary:ApiSecret"]
            );
            _cloudinary = new Cloudinary(account);
        }

        [HttpGet("upload-signature")]
        [Authorize]
        public IActionResult GetUploadSignature()
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            var folder = "ai-generated-images";
            var apiSecret = _config["Cloudinary:ApiSecret"];

            // Create a sorted dictionary of parameters to sign
            var parametersToSign = new SortedDictionary<string, object>
            {
                { "timestamp", timestamp },
                { "folder", folder }
            };

            // Manually create the string to sign
            // Example: "folder=ai-generated-images&timestamp=1758780297"
            var stringToSign = string.Join("&", parametersToSign.Select(kvp => $"{kvp.Key}={kvp.Value}"));

            // Append the API secret
            var stringToHash = stringToSign + apiSecret;

            // Compute the SHA-1 hash
            using var sha1 = SHA1.Create();
            var hashBytes = sha1.ComputeHash(Encoding.UTF8.GetBytes(stringToHash));

            // Convert the hash to a lowercase hexadecimal string
            var sb = new StringBuilder(hashBytes.Length * 2);
            foreach (byte b in hashBytes)
            {
                sb.Append(b.ToString("x2"));
            }
            var manualSignature = sb.ToString();

            // Send the necessary data back to the frontend, using our manual signature
            return Ok(new
            {
                signature = manualSignature, // Using the manually created signature
                timestamp,
                folder,
                cloudName = _config["Cloudinary:CloudName"],
                apiKey = _config["Cloudinary:ApiKey"]
            });
        }
    }
}
