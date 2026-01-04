using Microsoft.AspNetCore.Authentication;
using System.Security.Principal;

namespace KyroStackApp.Application.Users;

internal sealed class Profile(IIdentity userIdentity)
{
	public string Name { get; } = userIdentity.Name ?? "John Doe";
}

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

		if (!result.Succeeded || result.Principal.Identity is null)
		{
			await this.Send.NoContentAsync(ct);
			return;
		}

		await this.Send.OkAsync(new Profile(result.Principal.Identity), ct);
	}
}
