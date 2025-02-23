using Coacher.Backend.Application.Services.ExerciseService;
using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Coacher.Backend.WebAPI.Controllers.ExerciseController
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;
        private readonly ILogger<ExerciseController> _logger;

        public ExerciseController(IExerciseService exerciseService, ILogger<ExerciseController> logger)
        {
            _exerciseService = exerciseService ?? throw new ArgumentNullException(nameof(exerciseService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        
        [Authorize(Roles = "Coach")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exercise>>> GetAllAsync()
        {
            try
            {
                var exercises = await _exerciseService.GetAllAsync();
                return Ok(exercises);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500);
            }
        }

        [Authorize(Roles = "Coach")]
        [HttpGet("options")]
        public async Task<ActionResult<Exercise>> GetOptionsAsync(Guid id)
        {
            try
            {
                var exercises = await _exerciseService.GetOptionsAsync();
                return Ok(exercises);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting user by ID: {ex.Message}");
                throw;
            }
        }

        [Authorize(Roles = "Coach")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Exercise>> GetByIdAsync(Guid id)
        {
            try
            {
                var exercise = await _exerciseService.GetByIdAsync(id);
                if (exercise == null)
                    return NotFound();

                return Ok(exercise);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting user by ID: {ex.Message}");
                throw;
            }
        }

        [Authorize(Roles = "Coach")]
        [HttpPost]
        public async Task<ActionResult<Exercise>> CreateAsync(ExerciseDto exercise)
        {
            try
            {
                var newExercise = await _exerciseService.CreateAsync(exercise);
                return Ok(newExercise);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating exercise: {ex.Message}");
                throw;
            }
        }

        [Authorize(Roles = "Coach")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Exercise>> UpdateExercise(ExerciseDto exercise)
        {
            try
            {
                var updatedUser = await _exerciseService.UpdateAsync(exercise);
                return Ok(updatedUser);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating user: {ex.Message}");
                throw;
            }
        }

        [Authorize(Roles = "Coach")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Exercise>> DeleteExercise(Guid id)
        {
            try
            {
                await _exerciseService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting exercise: {ex.Message}");
                throw;
            }
        }
    }
}