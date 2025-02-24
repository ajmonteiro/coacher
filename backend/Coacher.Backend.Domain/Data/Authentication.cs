using System.Security.Claims;
using Coacher.Backend.Domain.Enums;

namespace Coacher.Backend.Domain.Data;

public static class Authentication
{
    public static bool IsAuthorized(ClaimsPrincipal user, Permission permission)
    {
        Console.WriteLine($"Checking permission: {permission}"); // Add logging
        if (user.IsInRole("Coach"))
        {
            Console.WriteLine("User is in Coach role"); // Add logging
            return true;
        }

        if (permission == Permission.ReadDashboard && user.IsInRole("User"))
        {
            Console.WriteLine("User is in User role and permission is ReadDashboard"); // Add logging
            return true;
        }

        bool hasClaim = user.HasClaim(c => c.Type == "Permission" && c.Value == permission.ToString());
        Console.WriteLine($"User has claim: Permission - {permission}: {hasClaim}"); // Add logging
        return hasClaim;
    }
}