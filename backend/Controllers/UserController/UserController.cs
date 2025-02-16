using backend.Entities;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Controllers.UserController
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController(AppDbContext context) : ControllerBase
    {

        [Authorize]
        [HttpGet]
        [Authorize(Policy = nameof(Services.AuthService.Permission.ReadUsers))]
        public async Task<ActionResult<object>> GetUsers(int page = 1, int perPage = 10)
        {
            if (page < 1 || perPage < 1)
                return BadRequest("Page and perPage must be greater than 0.");

            var totalItems = await context.Users
                
                .CountAsync();
            var users = await context.Users
                .Include(u => u.Role)
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
        [Authorize(Policy = nameof(Services.AuthService.Permission.ReadUsers))]
        public async Task<ActionResult<IEnumerable<SelectItemDto>>> GetUserOptions()
        {
            var users = await context.Users
                .Select(e => new SelectItemDto { label = e.FullName, value = e.Id })
                .ToListAsync();

            return Ok(users);
        }

        [Authorize]
        [HttpGet("{id}")]
        [Authorize(Policy = nameof(Services.AuthService.Permission.ReadUser))]
        public async Task<ActionResult<UserDto>> GetUser(Guid id)
        {
            var user = await context.Users
                .Include(u => u.Role) 
            .Include(u => u.Workouts)
                .ThenInclude(w => w.WorkoutExercises)
                    .ThenInclude(we => we.Exercise)
                .Include(u => u.Diets)
                .ThenInclude(d => d.DietMeals)
                .ThenInclude(dm => dm.Meal)
                .ThenInclude(m => m.MealFoods)
                .ThenInclude(mf => mf.Food)
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
                RoleId = user.RoleId,
                RoleName = user.Role.Name,
                Diets = user.Diets.Select(d => new DietDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    Description = d.Description,
                    Meals = d.DietMeals.Select(dm => new MealDto
                    {
                        Id = dm.Meal.Id,
                        Name = dm.Meal.Name,
                        Description = dm.Meal.Description,
                        MealFoods = dm.Meal.MealFoods.Select(mf => new MealFoodDto
                        {
                            FoodId = mf.FoodId,
                            Quantity = mf.Quantity,
                            Unit = mf.Unit,
                            FoodName = mf.Food.Name!,
                            Fat = mf.Food.Fat,
                            Calories = mf.Food.Calories,
                            Carbs = mf.Food.Carbs,
                            Protein = mf.Food.Protein,
                        }).ToList()
                    }).ToList(),
                }).ToList(),
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
        [Authorize(Roles = ("Coach, User"))]
        public async Task<ActionResult<User>> GetMe()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userIdClaim))
                {
                    return Unauthorized("User ID not found in token.");
                }

                if (!Guid.TryParse(userIdClaim, out Guid userId))
                {
                    return Unauthorized("Invalid user ID format.");
                }

                var user = await context.Users
                    .Include(u => u.Role)
                    .Include(u => u.UserPermissions)
                    .ThenInclude(up => up.Permission)
                    .FirstOrDefaultAsync(u => u.Id == userId);
                
                if (user is null)
                {
                    return NotFound("User not found.");
                }
                
                return Ok(new
                {
                    user.Id,
                    user.Username,
                    user.FullName,
                    user.Phone,
                    user.Weight,
                    user.Height,
                    user.RoleId,
                    Role = new
                    {
                        user.Role.Id,
                        user.Role.Name
                    },
                    Permissions = user.UserPermissions.Select(up => new
                    {
                        up.Permission.Id,
                        up.Permission.Name
                    }),
                    Workouts = user.Workouts,
                    Diets = user.Diets
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


        [Authorize]
        [HttpPost]
        [Authorize(Policy = nameof(Services.AuthService.Permission.CreateUser))]
        public async Task<ActionResult<UserDto>> CreateUser(UserDto userDto)
        {
            var role = await context.Roles.FirstOrDefaultAsync(r => r.Id == userDto.RoleId); 

            if (role == null) 
            {
                role = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Client");
                if (role == null)
                    return BadRequest("Default role 'Client' not found.");
            }

            var user = new User
            {
                Username = userDto.Username,
                FullName = userDto.FullName,
                Phone = userDto.Phone,
                PasswordHash = new PasswordHasher<UserDto>()
                    .HashPassword(userDto, "password"),
                Weight = userDto.Weight,
                Height = userDto.Height,
                RoleId = role.Id
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            var createdUserDto = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                FullName = user.FullName,
                Phone = user.Phone,
                Weight = user.Weight,
                Height = user.Height,
                RoleId = user.RoleId
            };

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, createdUserDto);
        }

        [Authorize]
        [HttpPut("{id}")]
        [Authorize(Policy = nameof(Services.AuthService.Permission.EditUser))]
        public async Task<ActionResult<User>> UpdateUser(Guid id, User user)
        {
            if (id != user.Id)
                return BadRequest("ID mismatch.");

            context.Entry(user).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(user);
        }

        [Authorize]
        [HttpDelete("{id}")]
        [Authorize(Policy = nameof(Services.AuthService.Permission.DeleteUser))]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await context.Users.FindAsync(id);
            if (user is null)
                return NotFound();

            context.Users.Remove(user);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
