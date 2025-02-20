namespace backend.Models
{
    public class PagedResult<T>
    {
        public int TotalItems { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public IEnumerable<T> Data { get; set; } = new List<T>();
    }
}