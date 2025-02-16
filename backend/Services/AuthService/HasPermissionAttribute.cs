using Microsoft.AspNetCore.Authorization;

namespace backend.Services.AuthService
{
    public class HasPermissionAttribute : AuthorizeAttribute
    {
        public HasPermissionAttribute(Permission permission) 
            : base(policy: permission.ToString())
        {
        }
    }
}