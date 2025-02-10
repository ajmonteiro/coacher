using Coacher.Entities;
using Coacher.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Coacher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DietController(AppDbContext context) : ControllerBase
    {
        public Diet Diet { get; set; } = new Diet();

        [HttpGet]
        public ActionResult<IEnumerable<Diet>> GetDiets()
        {
            return context.Diets;
        }

        [HttpGet("{id}")]
        public ActionResult<Diet> GetDiet(int id)
        {
            var Diet = context.Diets.Find(id);
            if (Diet is null)
                return NotFound();
            return Diet;
        }

        [HttpPost]
        public async Task<ActionResult<Diet>> CreateDiet(Diet Diet)
        {
            context.Diets.Add(Diet);
            await context.SaveChangesAsync();
            return Ok(Diet);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Diet>> UpdateDiet(int id, Diet Diet)
        {
            if (id != Diet.Id)
                return BadRequest();
            context.Entry(Diet).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(Diet);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Diet>> DeleteDiet(int id)
        {
            var Diet = context.Diets.Find(id);
            if (Diet is null)
                return NotFound();
            context.Diets.Remove(Diet);
            await context.SaveChangesAsync();
            return Ok(Diet);
        }
    }
}