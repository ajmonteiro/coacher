using Coacher.Entities;
using Coacher.Data;
using Coacher.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Coacher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<object>> GetUsers(int page = 1, int perPage = 10)
        {
            if (page < 1 || perPage < 1)
                return BadRequest("Page and perPage must be greater than 0.");

            var totalItems = await _context.Users.CountAsync();
            var users = await _context.Users
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .ToListAsync();

            return Ok(new
            {
                TotalItems = totalItems,
                PerPage = perPage,
                Page = page,
                Data = users
            });
        }

        [Authorize]
        [HttpGet("options")]
        public async Task<ActionResult<IEnumerable<SelectItemDto>>> GetUserOptions()
        {
            var users = await context.Users
                .Select(e => new SelectItemDto { label = e.FullName, value = e.Id })
                .ToListAsync();

            return Ok(users);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _context.Users
            .Include(u => u.Workouts)
                .ThenInclude(w => w.WorkoutExercises)
                    .ThenInclude(we => we.Exercise)
            .Include(u => u.Diets)
                .ThenInclude(d => d.DietMeals)
                    .ThenInclude(dm => dm.Meal)
            .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            var userDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                FullName = user.FullName,
                Phone = user.Phone,
                Weight = user.Weight,
                Height = user.Height,
                Role = user.Role,
                Workouts = user.Workouts.Select(w => new WorkoutDto
                {
                    Id = w.Id,
                    Name = w.Name,
                    Description = w.Description,
                    UserId = w.UserId,
                    Exercises = w.WorkoutExercises.Select(we => new ExerciseInWorkoutDto
                    {
                        ExerciseId = we.ExerciseId,
                        Name = we.Exercise.Name,
                        Sets = we.Sets,
                        Reps = we.Reps
                    }).ToList()
                }).ToList()
            };

            return Ok(userDto);
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<User>> GetMe()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userIdClaim))
                {
                    return Unauthorized("User ID not found in token.");
                }

                if (!int.TryParse(userIdClaim, out int userId))
                {
                    return Unauthorized("Invalid user ID format.");
                }

                var user = await _context.Users.FindAsync(userId);
                if (user is null)
                {
                    return NotFound("User not found.");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser(UserDto userDto)
        {
            var user = new User
            {
                Username = userDto.Username,
                FullName = userDto.FullName,
                Phone = userDto.Phone,
                Weight = userDto.Weight,
                Height = userDto.Height,
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUser(int id, User user)
        {
            if (id != user.Id)
                return BadRequest("ID mismatch.");

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user is null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
