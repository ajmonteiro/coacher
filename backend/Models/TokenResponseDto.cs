namespace backend.Models
{
    public class TokenResponseDto
    {
        public required string AccessToken { get; set; }
        public required string RefreshToken { get; set; }
        public UserPermissionDto Permissions { get; set; } = new();
    }
}
