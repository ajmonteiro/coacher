using System.Security.Claims;
using Coacher.Backend.Domain.Enums;

namespace Coacher.Backend.Domain.Data;

public static class Authentication
{
    public static bool IsAuthorized(ClaimsPrincipal user, Permission permission)
    {
        if (user.IsInRole("Coach"))
        {
            return true;
        }

        if (permission == Permission.ReadDashboard && user.IsInRole("User"))
        {
            return true;
        }

        bool hasClaim = user.HasClaim(c => c.Type == "Permission" && c.Value == permission.ToString());
        return hasClaim;
    }
}