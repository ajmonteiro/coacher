namespace Coacher.Entities
{
    public class Meal
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public ICollection<Food> Foods { get; set; } = new List<Food>();
        public Diet? Diet { get; set; }
        public Guid DietId { get; set; }
    }
}