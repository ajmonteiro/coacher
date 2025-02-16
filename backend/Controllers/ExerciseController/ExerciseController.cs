using backend.Entities;
using backend.Models;
using backend.Data;
using backend.Services.AuthService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Permission = backend.Services.AuthService.Permission;

namespace backend.Controllers.ExerciseController
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController(AppDbContext context) : ControllerBase
    {
        public Exercise Exercise { get; set; } = new Exercise();

        [Authorize(Roles = "Coach")]
        [HttpGet]
        [HasPermission(Permission.ReadExercise)]
        public async Task<ActionResult<object>> GetExercises(int page = 1, int perPage = 10)
        {
             if (page < 1 || perPage < 1)
                return BadRequest("Page and perPage must be greater than 0.");

            var totalItems = await context.Exercises.CountAsync();
            var Exercises = await context.Exercises
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .ToListAsync();

            return Ok(new
            {
                TotalItems = totalItems,
                PerPage = perPage,
                Page = page,
                Data = Exercises
            });
        }

        [Authorize(Roles = "Coach")]
        [HttpGet("options")]
        [HasPermission(Permission.ReadExercise)]
        public async Task<ActionResult<IEnumerable<SelectItemDto>>> GetExerciseOptions()
        {
            var exercises = await context.Exercises
                .Select(e => new SelectItemDto { label = e.Name, value = e.Id })
                .ToListAsync();

            return Ok(exercises);
        }

        [Authorize(Roles = "Coach")]
        [HttpGet("{id}")]
        [HasPermission(Permission.ReadExercise)]
        public ActionResult<Exercise> GetExercise(Guid id)
        {
            var Exercise = context.Exercises.Find(id);
            if (Exercise is null)
                return NotFound();
            return Exercise;
        }

        [Authorize(Roles = "Coach")]
        [HttpPost]
        [HasPermission(Permission.CreateExercise)]
        public async Task<ActionResult<Exercise>> CreateExercise(Exercise Exercise)
        {
            context.Exercises.Add(Exercise);
            await context.SaveChangesAsync();
            return Ok(Exercise);
        }

        [Authorize(Roles = "Coach")]
        [HttpPut("{id}")]
        [HasPermission(Permission.EditExercise)]
        public async Task<ActionResult<Exercise>> UpdateExercise(Guid id, Exercise Exercise)
        {
            if (id != Exercise.Id)
                return BadRequest();
            context.Entry(Exercise).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(Exercise);
        }

        [Authorize(Roles = "Coach")]
        [HttpDelete("{id}")]
        [HasPermission(Permission.DeleteExercise)]
        public async Task<ActionResult<Exercise>> DeleteExercise(Guid id)
        {
            var Exercise = context.Exercises.Find(id);
            if (Exercise is null)
                return NotFound();
            context.Exercises.Remove(Exercise);
            await context.SaveChangesAsync();
            return Ok(Exercise);
        }
    }
}