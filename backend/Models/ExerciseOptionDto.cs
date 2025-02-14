namespace backend.Models 
{
    public class SelectItemDto   
    {
        public string label { get; set; } = null!;
        public Guid value { get; set; }
    }
}