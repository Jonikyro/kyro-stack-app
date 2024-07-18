using System.Security.Claims;

namespace KyroStackApp.Application.Authentication;

public interface IIdentityBuilder
{
    Task<ClaimsPrincipal> BuildIdentity(ClaimsPrincipal principal);
}
