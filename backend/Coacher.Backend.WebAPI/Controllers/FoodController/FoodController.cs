
using Coacher.Backend.Application.Services.AuthService;
using Coacher.Backend.Application.Services.FoodService;
using Coacher.Backend.Contracts.Dto;
using Coacher.Backend.Domain.Data;
using Coacher.Backend.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers.FoodController
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        
        private readonly IFoodService _foodService;
        private readonly ILogger<FoodController> _logger;


        public FoodController(IFoodService foodService, ILogger<FoodController> logger)
        {
            _foodService = foodService;
            _logger = logger;
        }
        
        [Authorize(Roles = "Coach")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Food>>> GetAllAsync(int page = 1, int perPage = 10)
        {
            try
            {
                var foods = await _foodService.GetAllAsync(page, perPage);
                return Ok(foods);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500);
            }
        }

        [Authorize(Roles = "Coach")]
        [HttpGet("{id}")]
        public async Task<ActionResult<DietDto>> GetByIdAsync(Guid id)
        {
            try
            {
                var food = await _foodService.GetByIdAsync(id);
                return Ok(food);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500);
            }
        }

        [Authorize(Roles = "Coach")]
        [HttpGet("options")]
        public async Task<ActionResult<IEnumerable<SelectItemDto>>> GetOptionsAsync()
        {
            try
            {
                var foods = await _foodService.GetOptionsAsync();
                return Ok(foods);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500);
            }
        }

        [Authorize(Roles = "Coach")]
        [HttpPost]
        public async Task<ActionResult<Food>> CreateAsync(FoodDto food)
        {
            try
            {
                var newFood = await _foodService.CreateAsync(food);
                return Ok(newFood);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500);
            }
        }

        [Authorize(Roles = "Coach")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Food>> UpdateAsync(FoodDto foodDto)
        {
            try
            {
                var food = await _foodService.UpdateAsync(foodDto);
                return Ok(food);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500);
            }
          
        }

        [Authorize(Roles = "Coach")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Food>> DeleteFood(Guid id)
        {
            try
            {
                await _foodService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw;
            }
        }
    }
}