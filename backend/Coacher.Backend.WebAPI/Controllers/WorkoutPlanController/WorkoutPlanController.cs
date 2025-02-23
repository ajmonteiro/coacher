using Coacher.Backend.Application.Services.WorkoutPlanService;
using Coacher.Backend.Contracts.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Coacher.Backend.WebAPI.Controllers.WorkoutPlanController
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutPlanController : ControllerBase
    {
        private readonly IWorkoutPlanService _workoutPlanService;

        public WorkoutPlanController(IWorkoutPlanService workoutPlanService)
        {
            _workoutPlanService = workoutPlanService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutPlanDto>>> GetAllWorkoutPlans()
        {
            return Ok(await _workoutPlanService.GetAllWorkoutPlansAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutPlanDto>> GetWorkoutPlan(Guid id)
        {
            return Ok(await _workoutPlanService.GetWorkoutPlanAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<WorkoutPlanDto>> CreateWorkoutPlan(WorkoutPlanDto workoutPlanDto)
        {
            var plan = await _workoutPlanService.CreateWorkoutPlanAsync(workoutPlanDto);
            return CreatedAtAction(nameof(GetWorkoutPlan), new { id = plan.Id }, plan);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateWorkoutPlan(Guid id, WorkoutPlanDto workoutPlanDto)
        {
            if (id != workoutPlanDto.Id)
            {
                return BadRequest("Id mismatch");
            }

            try
            {
                await _workoutPlanService.UpdateWorkoutPlanAsync(workoutPlanDto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteWorkoutPlan(Guid id)
        {
            try
            {
                await _workoutPlanService.DeleteWorkoutPlanAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}