using KyroStackApp.Domain.User;
using Microsoft.AspNetCore.Authentication;

namespace Application.Users.GetProfile;

public class GetProfileEndpoint : EndpointWithoutRequest
{
    private readonly IUserRepository _userRepository;

    public GetProfileEndpoint(IUserRepository userRepository)
    {
        this._userRepository = userRepository;
    }

    public override void Configure()
    {
        this.Get("api/profile");
        this.AllowAnonymous();
    }

    public override async Task<object?> ExecuteAsync(CancellationToken ct)
    {
        AuthenticateResult result = await this.HttpContext.AuthenticateAsync();

        _ = await this._userRepository.GetByIdAsync(UId.Create());

        if (!result.Succeeded)
        {
            return TypedResults.NoContent();
        }

        return TypedResults.Ok(new {
            Name = result.Principal.Identity?.Name ?? "Sally"
        });
    }
}
