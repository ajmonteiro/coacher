using Coacher.Backend.Contracts.Dto;

namespace Coacher.Backend.Application.Services.DashboardService
{
    public interface IDashboardService
    {
        Task<DashboardDto> GetDashboardAsync();
    }
}