using Coacher.Entities;

namespace Coacher.Models
{
    public class DietResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int UserId { get; set; }
        public List<MealInDietDto> Meals { get; set; } = new();
    }

    public class MealInDietDto
    {
        public int MealId { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class DietCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int UserId { get; set; }
        public List<DietMealDto> Meals { get; set; } = new();
    }

     public class DietMealDto
    {
        public int MealId { get; set; }
    }

     public class DietDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int UserId { get; set; } 

        public List<MealInDietDto> Meals { get; set; } = new();
    }
}