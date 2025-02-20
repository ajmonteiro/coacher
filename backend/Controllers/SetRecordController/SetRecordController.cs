using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
// ... other usings

namespace backend.Controllers.SetRecordController
{
    [Route("api/[controller]")]
    [ApiController]
    public class SetRecordController(AppDbContext context) : ControllerBase
    {
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<SetRecordDto>> CreateSetRecord(SetRecordDto setRecordDto)
        {
            var workoutExercise = await context.WorkoutExercises.FindAsync(setRecordDto.WorkoutExerciseId);
            if (workoutExercise == null)
            {
                return BadRequest("Invalid WorkoutExerciseId");
            }

            var setRecord = new SetRecord
            {
                WorkoutExerciseId = setRecordDto.WorkoutExerciseId,
                Reps = setRecordDto.Reps,
                Weight = setRecordDto.Weight,
                UserId = setRecordDto.UserId,
            };

            context.SetRecords.Add(setRecord);
            await context.SaveChangesAsync();

            setRecordDto.Id = setRecord.Id;

            return CreatedAtAction(nameof(GetSetRecord), new { id = setRecord.Id }, setRecordDto); 
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<SetRecordDto>> GetSetRecord(Guid id)
        {
            var setRecord = await context.SetRecords.FindAsync(id);
            if (setRecord == null)
            {
                return NotFound();
            }

            var setRecordDto = new SetRecordDto
            {
                Id = setRecord.Id,
                WorkoutExerciseId = setRecord.WorkoutExerciseId,
                Reps = setRecord.Reps,
                Weight = setRecord.Weight,
                UserId = setRecord.UserId
            };

            return Ok(setRecordDto);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateSetRecord(Guid id, SetRecordDto setRecordDto)
        {
            if (id != setRecordDto.Id)
            {
                return BadRequest();
            }

            var setRecord = await context.SetRecords.FindAsync(id);
            if (setRecord == null)
            {
                return NotFound();
            }

            setRecord.Reps = setRecordDto.Reps;
            setRecord.Weight = setRecordDto.Weight;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!SetRecordExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteSetRecord(Guid id)
        {
            var setRecord = await context.SetRecords.FindAsync(id);
            if (setRecord == null)
            {
                return NotFound();
            }

            context.SetRecords.Remove(setRecord);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool SetRecordExists(Guid id)
        {
            return context.SetRecords.Any(e => e.Id == id);
        }
    }
}