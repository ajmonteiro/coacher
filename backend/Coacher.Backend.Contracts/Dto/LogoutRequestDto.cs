namespace Coacher.Backend.Contracts.Dto
{
    public class LogoutRequestDto
    {
        public string RefreshToken { get; set; } = null!;
    }
}