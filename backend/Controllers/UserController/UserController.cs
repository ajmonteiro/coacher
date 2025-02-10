using Coacher.Entities;
using Coacher.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(AppDbContext context) : ControllerBase
    {
        public User User { get; set; } = new User();

        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return context.Users;
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = context.Users.Find(id);
            if (user is null)
                return NotFound();
            return user;
        }

        [HttpGet("me")]
        public ActionResult<User> GetMe()
        {
            return User;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUser(int id, User user)
        {
            if (id != user.Id)
                return BadRequest();
            context.Entry(user).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = context.Users.Find(id);
            if (user is null)
                return NotFound();
            context.Users.Remove(user);
            await context.SaveChangesAsync();
            return Ok(user);
    }
    }
}