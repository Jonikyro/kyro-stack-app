using System.Security.Claims;

namespace KyroStackApp.Application.Authentication;

public class StubIdentityBuilder : IIdentityBuilder
{
    public Task<ClaimsPrincipal> BuildIdentity(ClaimsPrincipal principal)
    {
        ClaimsIdentity claimsIdentity = new(
            [
                new Claim("Name", principal?.Identity?.Name ?? "John Doe")
            ],
            OpenIdConnectAuth.LOGIN_SCHEME
        );

        ClaimsPrincipal userPrincipal = new(claimsIdentity);

        return Task.FromResult(userPrincipal);
    }
}
