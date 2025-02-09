namespace Coacher.Entities
{
    public class User 
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Weight { get; set; } = string.Empty;
        public string Height { get; set; } = string.Empty;

        public string? Role { get; set; } = string.Empty;

        public ICollection<Diet> Diets { get; set; } = new List<Diet>();

        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
    }
}