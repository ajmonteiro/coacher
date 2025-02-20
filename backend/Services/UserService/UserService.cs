using System.Collections;
using System.Security.Claims;
using backend.Models;
using backend.Entities;
using backend.Data;
using backend.Entities.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(
            AppDbContext context,
            IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<PagedResult<User>> GetAllAsync(int page = 1, int pageSize = 10)
        {
            var query = _context.Users
                .WithBasicIncludes()
                .WithFitnessData();

            var totalItems = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<User>
            {
                TotalItems = totalItems,
                Page = page,
                PageSize = pageSize,
                Data = items
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

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _context.Users
                .WithBasicIncludes()
                .WithFitnessData()
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetCurrentAsync()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?
                .User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
                throw new UnauthorizedAccessException("User ID not found in token");

            if (!Guid.TryParse(userIdClaim, out Guid userId))
                throw new UnauthorizedAccessException("Invalid user ID format");

            var user = await _context.Users
                 .WithBasicIncludes()
                 .WithFitnessData()
                 .FirstOrDefaultAsync(u => u.Id == userId);
                
            if(user == null) throw new UnauthorizedAccessException("User not found");

            return user;
        }

        public async Task<User> CreateAsync(UserCreateDto user)
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
                PasswordHash = new PasswordHasher<UserCreateDto>().HashPassword(user, "password"),
                Weight = user.Weight,
                Height = user.Height,
                RoleId = role.Id
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return newUser;
        }

        public async Task<User> UpdateAsync(UserUpdateDto user)
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
            return existingUser;
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