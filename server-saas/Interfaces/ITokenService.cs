using server_saas.Models;

namespace server_saas.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
