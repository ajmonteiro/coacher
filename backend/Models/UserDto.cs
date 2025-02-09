namespace Coacher.Models 
{
    public class UserDto 
    {
        public required string Username { get; set; }
        public required string FullName { get; set; }
        public required string Phone { get; set; }
        public required string Password { get; set; }
        public required string Weight { get; set; }
        public required string Height { get; set; }

        public string? Role { get; set; }
    }
}