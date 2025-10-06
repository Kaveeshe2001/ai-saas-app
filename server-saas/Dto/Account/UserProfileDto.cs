namespace server_saas.Dto.Account
{
    public class UserProfileDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool IsPremium { get; set; }
    }
}
