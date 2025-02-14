using backend.Entities;

namespace backend.Models
{
    public class CreateDietDto
    {
        public Guid UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public List<CreateMealDto> Meals { get; set; } = new List<CreateMealDto>();
    }

    public class DietResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public List<MealInDietDto> Meals { get; set; } = new();
    }

    public class MealInDietDto
    {
        public Guid MealId { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class DietCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public List<DietMealDto> Meals { get; set; } = new();
    }

     public class DietMealDto
    {
        public Guid MealId { get; set; }
    }

     public class DietDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public List<MealDto> Meals { get; set; } = new List<MealDto>();
    }
}