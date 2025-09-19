using CloudinaryDotNet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

            var parametersToSign = new Dictionary<string, object>
            {
                { "timestamp", timestamp },
                { "folder", folder },
            };

            //Generate the signature using API secret
            string signature = _cloudinary.Api.SignParameters(parametersToSign);

            //Send the necessary data back to the frontend
            return Ok(new
            {
                signature,
                timestamp,
                folder,
                cloudName = _config["Cloudinary:CloudName"],
                apiKey = _config["Cloudinary:ApiKey"]
            });
        }
    }
}
