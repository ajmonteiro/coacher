using Coacher.Entities;
using Coacher.Models;
using Coacher.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Coacher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController(AppDbContext context) : ControllerBase
    {
        public Exercise Exercise { get; set; } = new Exercise();

        [Authorize]
        [HttpGet]
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

        [Authorize]
        [HttpGet("options")]
        public async Task<ActionResult<IEnumerable<SelectItemDto>>> GetExerciseOptions()
        {
            var exercises = await context.Exercises
                .Select(e => new SelectItemDto { label = e.Name, value = e.Id })
                .ToListAsync();

            return Ok(exercises);
        }

        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<Exercise> GetExercise(int id)
        {
            var Exercise = context.Exercises.Find(id);
            if (Exercise is null)
                return NotFound();
            return Exercise;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Exercise>> CreateExercise(Exercise Exercise)
        {
            context.Exercises.Add(Exercise);
            await context.SaveChangesAsync();
            return Ok(Exercise);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Exercise>> UpdateExercise(int id, Exercise Exercise)
        {
            if (id != Exercise.Id)
                return BadRequest();
            context.Entry(Exercise).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(Exercise);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Exercise>> DeleteExercise(int id)
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