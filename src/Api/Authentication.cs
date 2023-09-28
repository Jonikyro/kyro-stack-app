using Microsoft.AspNetCore.Mvc;

namespace Api;

internal static class ConfigureAutentication
{
    internal static IEndpointConventionBuilder MapLoginEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints.MapGet("login", ([FromQuery] string? redirectTo) =>
        {
            const string INDEX_PATH = "/";

            return Results.LocalRedirect(redirectTo ?? INDEX_PATH);
        }).RequireAuthorization(policy =>
        {
            policy.AddAuthenticationSchemes("oidc");
            policy.RequireAuthenticatedUser();
        });
    }
}
