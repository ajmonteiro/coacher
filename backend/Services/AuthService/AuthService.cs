using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace backend.Services.AuthService
{
    public class AuthService(AppDbContext context, IConfiguration configuration) : IAuthService
    {
        public async Task<TokenResponseDto?> LoginAsync(LoginDto request)
        {
            var user = await context.Users
                .Include(u => u.Role)
                .Include(u => u.UserPermissions) // Inclua as permissões
                .ThenInclude(up => up.Permission) // Inclua os detalhes da permissão
                .FirstOrDefaultAsync(u => u.Username == request.Username);
            
            if (user is null)
            {
                return null;
            }

            if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
            {
                return null;
            }
            
            var isCoach = user.Role.Name == "Coach";
            
            return await CreateTokenResponse(user);
        }

        public async Task LogoutAsync(LogoutRequestDto request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.RefreshToken == request.RefreshToken);

            if (user != null)
            {
                user.RefreshToken = null;
                user.RefreshTokenExpiryTime = null;
                await context.SaveChangesAsync();
            }
        }

        private async Task<TokenResponseDto> CreateTokenResponse(User user)
        {
            return new TokenResponseDto
            {
                AccessToken = CreateToken(user),
                RefreshToken = await GenerateAndSaveRefreshTokenAsync(user),
            };
        }


        public async Task<User?> RegisterAsync(UserDto request)
        {
            if (await context.Users.AnyAsync(u => u.Username == request.Username))
            {
                return null;
            }

            var role = await context.Roles.FirstOrDefaultAsync(r => r.Id == request.RoleId);
            if (role == null)
                return null;

            var user = new User();
            var hashedPassword = new PasswordHasher<User>()
                .HashPassword(user, request.Password);

            user.Username = request.Username;
            user.PasswordHash = hashedPassword;
            user.RoleId = request.RoleId;
            user.FullName = request.FullName;
            user.Phone = request.Phone;
            user.Weight = request.Weight;
            user.Height = request.Height;

            context.Users.Add(user);
            await context.SaveChangesAsync();
            await AssignPermissionsToUser(user);

            return user;
        }

        public async Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request)
        {
            var user = await ValidateRefreshTokenAsync(request.UserId, request.RefreshToken);
            if (user is null)
                return null;
            
            var isCoach = user.Role.Name == "Coach";

            return await CreateTokenResponse(user);
        }

        private async Task<User?> ValidateRefreshTokenAsync(Guid userId, string refreshToken)
        {
            var user = await context.Users.FindAsync(userId);
            if (user is null || user.RefreshToken != refreshToken
                || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null;
            }

            return user;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<string> GenerateAndSaveRefreshTokenAsync(User user)
        {
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await context.SaveChangesAsync();
            return refreshToken;
        }

        private async Task AssignPermissionsToUser(User user)
        {
            var readDashboardPermission = await context.Permissions
                .FirstOrDefaultAsync(p => p.Name == "ReadDashboard");

            if (readDashboardPermission == null)
            {
                throw new InvalidOperationException("Permission 'ReadDashboard' not found.");
            }

            var userPermissions = new List<UserPermission>();

            userPermissions.Add(new UserPermission
            {
                UserId = user.Id,
                PermissionId = readDashboardPermission.Id
            });


            context.UserPermission.AddRange(userPermissions);
            await context.SaveChangesAsync();
        }

        
        private string CreateToken(User user)
        {
            if (user.Role == null)
            {
                throw new InvalidOperationException("User's role is null.");
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.Name)
            };
            
            foreach (var permission in user.UserPermissions)
            {
                claims.Add(new Claim("Permission", permission.Permission.Name));
            }

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration.GetValue<string>("AppSettings:Token")!));
            
            Console.WriteLine($"Key used: {configuration.GetValue<string>("AppSettings:Token")}");

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("AppSettings:Issuer"),
                audience: configuration.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }

    }
}