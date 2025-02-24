using Coacher.Backend.Application.Services.DietService;
using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Coacher.Backend.WebAPI.Controllers.DietController
{
    [Route("api/[controller]")]
    [ApiController]
    public class DietController : ControllerBase
    {
        private IDietService _dietService;
        private readonly ILogger<DietController> _logger;

        public DietController(IDietService dietService, ILogger<DietController> logger)
        {
            _dietService = dietService;
            _logger = logger;
        }
        
        [Authorize(Roles = "Coach")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Diet>>> GetAllAsync(int page = 1, int perPage = 10)
        {
            try
            {
                var diets = await _dietService.GetAllAsync(page, perPage);
                return Ok(diets);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500);
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<DietDto>> GetByIdAsync(Guid id)
        {
            try
            {
                var diet = await _dietService.GetDietAsync(id);
                return Ok(diet);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }
        }

        
        [Authorize(Roles = "Coach")]
        [HttpPost]
        public async Task<ActionResult<Diet>> CreateAsync(DietDto diet)
        {
            try
            {
                var newDiet = await _dietService.CreateDietAsync(diet);
                return Ok(newDiet);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating exercise: {ex.Message}");
                throw;
            }
        }
       

        [Authorize(Roles = "Coach")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Diet>> UpdateAsync(DietDto diet)
        {
            try
            {
                var newDiet = await _dietService.UpdateDietAsync(diet);
                return Ok(newDiet);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating exercise: {ex.Message}");
                throw;
            }
        }


        [Authorize(Roles = "Coach")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Diet>> DeleteAsync(Guid id)
        {
            try
            {
                await _dietService.DeleteDietAsync(id);
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