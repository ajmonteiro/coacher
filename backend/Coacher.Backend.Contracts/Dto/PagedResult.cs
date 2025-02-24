namespace Coacher.Backend.Contracts.Dto
{
    public class PagedResult<T>
    {
        public int TotalItems { get; set; }
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
        public IEnumerable<T> Data { get; set; } = new List<T>();
    }
}