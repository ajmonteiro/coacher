namespace Coacher.Backend.Contracts.Dto
{
    public class SelectItemDto   
    {
        public string label { get; set; } = null!;
        public Guid value { get; set; }
    }
}