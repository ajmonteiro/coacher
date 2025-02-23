using Coacher.Backend.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace Coacher.Backend.Application.Services.AuthService
{
    public class HasPermissionAttribute : AuthorizeAttribute
    {
        public HasPermissionAttribute(Permission permission) 
            : base(policy: permission.ToString())
        {
        }
    }
}