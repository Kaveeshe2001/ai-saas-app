using System.Security.Claims;

namespace server_saas.Extentions
{
    public static class ClaimExtentions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user), "ClaimPrincipal cannot be null");
            }

            var nameClaim = user.Claims.SingleOrDefault(x => x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"));
            return nameClaim?.Value;
        }
    }
}
