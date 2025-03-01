using System.Security.Claims;
using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Data;
using Coacher.Backend.Domain.Entities;
using Coacher.Backend.Domain.Entities.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Backend.Application.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly CoacherContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserService(
            CoacherContext context,
            IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<PagedResult<UserDto>> GetAllAsync(int page = 1, int perPage = 10)
        {
            var query = _context.Users
                .WithBasicIncludes()
                .WithFitnessData();

            var totalItems = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .ToListAsync();

            var users = items.Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                FullName = u.FullName,
                Phone = u.Phone,
                Weight = u.Weight,
                Height = u.Height,
                RoleId = u.RoleId,
                RoleName = u.Role.Name
            });

            return new PagedResult<UserDto>
            {
                TotalItems = totalItems,
                Page = page,
                PerPage = perPage,
                Data = users
            };
        }

        public async Task<IEnumerable<SelectItemDto>> GetOptionsAsync()
        {
            var query = _context.Users
                .Select(u => new SelectItemDto
                {
                    label = u.FullName,
                    value = u.Id
                });

            return await query.ToListAsync();
        }

        public async Task<UserDto?> GetByIdAsync(Guid id)
        {
            var user = await _context.Users
                .WithBasicIncludes()
                .WithFitnessData()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                throw new KeyNotFoundException();
            }

            return new UserDto 
            {
                Id = user.Id,
                Username = user.Username,
                FullName = user.FullName,
                Phone = user.Phone,
                Weight = user.Weight,
                Height = user.Height,
                RoleId = user.RoleId,
                RoleName = user.Role.Name
            };
        }

        public async Task<UserDto> GetCurrentAsync()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null || httpContext.User == null)
                throw new UnauthorizedAccessException("HttpContext or User is null");

            var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
                throw new UnauthorizedAccessException("User ID not found in token");

            if (!Guid.TryParse(userIdClaim, out Guid userId))
                throw new UnauthorizedAccessException("Invalid user ID format");

            var user = await _context.Users
                    .WithBasicIncludes()
                     .WithFitnessData()
                     .FirstOrDefaultAsync(u => u.Id == userId);
            
            if(user == null) throw new UnauthorizedAccessException("User not found");


            return UserIncludeExtensions.UserToDto(user);
        }

        public async Task<UserDto> CreateAsync(UserDto user)
        {
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.Id == user.RoleId);
            if (role == null)
                throw new KeyNotFoundException();

            var newUser = new User
            {
                Id = Guid.NewGuid(),
                Username = user.Username,
                FullName = user.FullName,
                Phone = user.Phone,
                PasswordHash = new PasswordHasher<UserDto>().HashPassword(user, "password"),
                Weight = user.Weight,
                Height = user.Height,
                RoleId = role.Id
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return new UserDto
            {
                Id = newUser.Id,
                Username = newUser.Username,
                FullName = newUser.FullName,
                Phone = newUser.Phone,
                Weight = newUser.Weight,
                Height = newUser.Height,
                RoleId = newUser.RoleId,
                RoleName = role.Name
            };
        }

        public async Task<UserDto> UpdateAsync(UserDto user)
        {
            var existingUser = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == user.Id);

            if (existingUser == null)
                throw new KeyNotFoundException();

            existingUser.Username = user.Username;
            existingUser.FullName = user.FullName;
            existingUser.Phone = user.Phone;
            existingUser.Weight = user.Weight;
            existingUser.Height = user.Height;
            existingUser.RoleId = user.RoleId;

            await _context.SaveChangesAsync();
            return new UserDto
            {
                Id = existingUser.Id,
                Username = existingUser.Username,
                FullName = existingUser.FullName,
                Phone = existingUser.Phone,
                Weight = existingUser.Weight,
                Height = existingUser.Height,
                RoleId = existingUser.RoleId,
                RoleName = existingUser.Role.Name
            };
        }

        public async Task DeleteAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }
    }
}