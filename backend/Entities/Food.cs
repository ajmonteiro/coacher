namespace backend.Entities
{
    public class Food : BaseEntity
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public double? Calories { get; set; }
        public double? Protein { get; set; }
        public double? Carbs { get; set; }
        public double? Fat { get; set; }
        public virtual ICollection<MealFood> MealFoods { get; set; } = new List<MealFood>();

    }
}