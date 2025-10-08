using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server_saas.Models;
using Stripe;
using Stripe.Checkout;

namespace server_saas.Controllers
{
    [Route("server_saas/payment")]
    [ApiController]
    public class PaymentController : Controller
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;

        public PaymentController(IConfiguration config, UserManager<User> userManager)
        {
            _config = config;
            _userManager = userManager;
            StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];
        }

        [HttpPost("create-checkout-session")]
        [Authorize]
        public async Task<IActionResult> CreateCheckoutSession()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound();
            }

            var priceId = _config["Stripe:PriceId"];
            var domain = "http://localhost:5173";

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions { Price = priceId, Quantity = 1 }
                },
                Mode = "subscription",
                SuccessUrl = $"{domain}/profile?payment=success", // Redirect here on success
                CancelUrl = $"{domain}/plan", // Redirect here if they cancel
                CustomerEmail = user.Email,
                // This links the Stripe session to your internal user ID
                ClientReferenceId = user.Id
            };

            var service = new SessionService();
            Session session = service.Create(options);

            return Ok(new { url = session.Url });
        }

        [HttpPost("webhook")]
        [AllowAnonymous]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var webhookSecret = _config["Stripe:WebhookSecret"];
            var signatureHeader = Request.Headers["Stripe-Signature"];

            if (string.IsNullOrEmpty(webhookSecret))
            {
                return BadRequest("Webhook secret is not configured.");
            }
            if (string.IsNullOrEmpty(signatureHeader))
            {
                return BadRequest("Stripe-Signature header is missing.");
            }

            try
            {
                var stripeEvent = EventUtility.ConstructEvent
                (
                    json,
                    Request.Headers["Stripe-Signature"],
                    webhookSecret
                );

                // Handle the checkout.session.completed event
                if (stripeEvent.Type == "checkout.session.completed")
                {
                    var session = stripeEvent.Data.Object as Session;

                    // Retrieve the userId we stored in ClientReferenceId
                    var userId = session.ClientReferenceId;
                    var user = await _userManager.FindByIdAsync(userId);

                    if (user != null)
                    {
                        user.IsPremium = true;
                        await _userManager.UpdateAsync(user);
                    }
                }

                return Ok();
            }
            catch (StripeException ex)
            {
                // Return a more specific error for bad signatures
                return BadRequest(new { Error = "Invalid Stripe signature.", Details = ex.Message });
            }
            catch (Exception ex)
            {
                // Catch any other unexpected errors
                return StatusCode(500, new { Error = "An unexpected error occurred.", Details = ex.Message });
            }
        }
    }
}
