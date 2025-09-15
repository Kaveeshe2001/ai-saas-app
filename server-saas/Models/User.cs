using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace server_saas.Models
{
    [Table("ApplicationUser")]
    public class User: IdentityUser
    {
    }
}
