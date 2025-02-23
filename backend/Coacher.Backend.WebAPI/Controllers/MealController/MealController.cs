
using Coacher.Backend.Application.Services.MealService;
using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Coacher.Backend.WebAPI.Controllers.MealController
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private readonly IMealService _mealService;
        private readonly ILogger<MealController> _logger;

        public MealController(IMealService mealService, ILogger<MealController> logger)
        {
            _mealService = mealService;
            _logger = logger;
        }
        
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Meal>>> GetAllAsync()
        {
            try
            {
                var meals = await _mealService.GetAllAsync();
                return Ok(meals);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Meal>> GetByIdAsync(Guid id)
        {
            try
            {
                var meal = await _mealService.GetByIdAsync(id);
                if (meal == null)
                    return NotFound();

                return Ok(meal);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error getting meal by ID: {ex.Message}");
                throw;
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Meal>> CreateAsync(MealDto user)
        {
            try
            {
                var newMeal = await _mealService.CreateAsync(user);
                return CreatedAtAction(nameof(GetByIdAsync), new { id = newMeal.Id }, newMeal);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating meal: {ex.Message}");
                throw;
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Meal>> UpdateMeal(MealDto meal)
        {
            try
            {
                var updateMeal = await _mealService.UpdateAsync(meal);
                return Ok(updateMeal);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating meal: {ex.Message}");
                throw;
            }
            
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Meal>> DeleteMeal(Guid id)
        {
            try
            {
                await _mealService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting user: {ex.Message}");
                throw;
            }
        }
    }
}
