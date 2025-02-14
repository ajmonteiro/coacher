namespace backend.Models
{
    public class LogoutRequestDto
    {
        public string RefreshToken { get; set; } = null!; // Make sure to handle nulls appropriately
    }
}