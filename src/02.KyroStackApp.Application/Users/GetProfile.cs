using Microsoft.AspNetCore.Authentication;

namespace KyroStackApp.Application.Users;

internal sealed record Profile(string Name);

internal sealed class GetProfileEndpoint : EndpointWithoutRequest
{
    public override void Configure()
    {
        this.Get("api/profile");
        this.AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        AuthenticateResult result = await this.HttpContext.AuthenticateAsync();

        if (!result.Succeeded || string.IsNullOrWhiteSpace(result.Principal?.Identity?.Name))
        {
            await this.SendNoContentAsync(ct);
        }
        else
        {
            await this.SendOkAsync(new Profile(result.Principal.Identity!.Name!), ct);
        }
    }
}
