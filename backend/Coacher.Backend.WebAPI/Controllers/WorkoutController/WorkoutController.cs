using Coacher.Backend.Application.Services.WorkoutService;
using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Coacher.Backend.WebAPI.Controllers.WorkoutController;

[ApiController]
[Route("api/[controller]")]
public class WorkoutController : ControllerBase
{
    private readonly IWorkoutService _workoutService;

    public WorkoutController(IWorkoutService workoutService)
    {
        _workoutService = workoutService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<Workout>>> GetAllWorkoutsAsync(int page = 1, int perPage = 10)
    {
        try {
            var workouts = await _workoutService.GetAllWorkoutsAsync(page, perPage);
            return Ok(workouts);
        } catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<WorkoutDto>> GetWorkoutAsync(Guid id)
    {
        try {
            var workout = await _workoutService.GetWorkoutAsync(id);
            return Ok(workout);
        } catch(KeyNotFoundException)
        {
            return NotFound();
        } catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPut]
    public async Task<ActionResult<Workout>> UpdateWorkoutAsync(WorkoutDto workout)
    {
        try {
            var updatedWorkout = await _workoutService.UpdateWorkoutAsync(workout);
            return Ok(updatedWorkout);
        } catch(KeyNotFoundException)
        {
            return NotFound();
        } catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteWorkoutAsync(Guid id)
    {
        try {
            await _workoutService.DeleteWorkoutAsync(id);
            return NoContent();
        } catch(KeyNotFoundException)
        {
            return NotFound();
        } catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}