using System.Security.Claims;

namespace server_saas.Extentions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserId(this ClaimsPrincipal user)
        {
            // This is the direct way to get the User ID claim
            return user.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}
