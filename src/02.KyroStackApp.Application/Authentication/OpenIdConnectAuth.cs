using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.AspNetCore.Authentication;
using System.Net;
using System.Security.Claims;

namespace KyroStackApp.Application.Authentication;

/// <summary>
/// Marker interface for logging
/// </summary>
file interface IOpenIdConnect { }

public sealed class OpenIdConnectOptions
{
    public required string Authority { get; init; }
    public required string ClientId { get; init; }
    public required string ClientSecret { get; init; }
    /// <summary>
    /// See <see cref="OpenIdConnectResponseType"/>s.
    /// </summary>
    public string? ResponseType { get; init; }
    /// <summary>
    /// See <see cref="OpenIdConnectResponseMode"/>s.
    /// </summary>
    public string? ResponseMode { get; init; }
    public bool? UsePkce { get; init; }
    public bool? RequireHttpsMetadata { get; init; }
    public IEnumerable<string> Scopes { get; init; } = [];
}

public static class OpenIdConnectAuth
{
    public const string LOGIN_SCHEME = "CookieScheme";
    public const string LOGIN_COOKIE_NAME = "__Host-KyroStackApp.Session";

    public const string CHALLENGE_SCHEME = "OpenIdConnectScheme";
    public const string CHALLENGE_COOKIE_SCHEME = "OpenIdConnectCookieScheme";
    public const string CHALLENGE_COOKIE_NAME = "__Host-KyroStackApp.External";

    public const string LOGIN_PATH = "/login";
    public const string LOGOUT_PATH = "/logout";

    public static void AddOpenIdConnectAuthentication(this IServiceCollection services, OpenIdConnectOptions oidcOptions)
    {
        JsonWebTokenHandler.DefaultInboundClaimTypeMap.Clear();

        services.AddAuthentication((options) =>
        {
            options.DefaultScheme = LOGIN_SCHEME;
            options.DefaultChallengeScheme = CHALLENGE_SCHEME;
        })
        .AddCookie(authenticationScheme: LOGIN_SCHEME, (options) =>
        {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#cookie_prefixes
            options.Cookie.Name = LOGIN_COOKIE_NAME;
            options.Cookie.SameSite = SameSiteMode.Lax;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
            options.Cookie.MaxAge = TimeSpan.FromMinutes(30);
            options.Cookie.IsEssential = true;

            options.SlidingExpiration = true;
            options.LoginPath = LOGIN_PATH;
            options.LogoutPath = LOGOUT_PATH;

            options.Events.OnRedirectToLogin = static ctx =>
            {
                // Redirecting will be handled by the client.
                ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return Task.CompletedTask;
            };

            options.Events.OnRedirectToAccessDenied = static ctx =>
            {
                // Redirecting will be handled by the client.
                ctx.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                return Task.CompletedTask;
            };

        })
        .AddOpenIdConnect(CHALLENGE_SCHEME, (options) =>
        {
            // Store the claims from external auth provider into the `CHALLENGE_COOKIE_SCHEME` cookie.
            // This way the login cookie only contains the claims set by *you* inside the `IIdentityBuilder` implementation.
            options.SignInScheme = CHALLENGE_COOKIE_SCHEME;
            options.Authority = oidcOptions.Authority;
            options.ClientId = oidcOptions.ClientId;
            options.ClientSecret = oidcOptions.ClientSecret;
            options.CallbackPath = "/api/signin-oidc";

            options.ResponseType = oidcOptions.ResponseType ?? OpenIdConnectResponseType.Code;
            options.ResponseMode = oidcOptions.ResponseMode ?? OpenIdConnectResponseMode.FormPost;
            options.UsePkce = oidcOptions.UsePkce ?? true;
            options.RequireHttpsMetadata = oidcOptions.RequireHttpsMetadata ?? true;
            
            options.SaveTokens = false;
            options.GetClaimsFromUserInfoEndpoint = true;
            options.MapInboundClaims = false;

            options.Scope.Clear();
            foreach (var scope in oidcOptions.Scopes)
            {
                options.Scope.Add(scope);
            }

            options.TokenValidationParameters = new()
            {
                NameClaimType = "sub"
            };

            options.Events.OnRemoteFailure = static ctx =>
            {
                ILogger logger = ctx.HttpContext.RequestServices.GetRequiredService<ILogger<IOpenIdConnect>>();

                logger.LogError("Remote authentication failed");

                ctx.HandleResponse();
                ctx.Response.Redirect("/");
                return Task.CompletedTask;
            };
        })
        .AddCookie(CHALLENGE_COOKIE_SCHEME, (options) =>
        {
            options.Cookie.Name = CHALLENGE_COOKIE_NAME;
            options.Cookie.SameSite = SameSiteMode.Lax;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
            options.Cookie.MaxAge = TimeSpan.FromMinutes(10);

            options.SlidingExpiration = false;

            options.Events.OnRedirectToLogin = static ctx =>
            {
                ctx.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return Task.CompletedTask;
            };

            options.Events.OnRedirectToAccessDenied = static ctx =>
            {
                ctx.Response.StatusCode = (int)HttpStatusCode.NotFound;
                return Task.CompletedTask;
            };
        });
    }
}

public class LoginEndpoint : EndpointWithoutRequest
{
    public override void Configure()
    {
        this.Get("/login");
        this.AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        AuthenticateResult result = await this.HttpContext.AuthenticateAsync(OpenIdConnectAuth.LOGIN_SCHEME);

        if (result.Succeeded)
        {
            this.HttpContext.Response.Redirect("/");
        }

        string? returnUrl = this.Query<string>("returnUrl", isRequired: false);

        await this.HttpContext.ChallengeAsync(OpenIdConnectAuth.CHALLENGE_SCHEME, new AuthenticationProperties
        {
            RedirectUri = "/callback?returnUrl=" + returnUrl
        });

        // This is required for the `ChallengeAsync` to work.
        this.DontAutoSendResponse();
    }
}

public class CallbackEndpoint : EndpointWithoutRequest
{
    private readonly IIdentityBuilder _identityBuilder;
    private readonly ILogger<CallbackEndpoint> _logger;

    public CallbackEndpoint(IIdentityBuilder identityBuilder, ILogger<CallbackEndpoint> logger)
    {
        this._identityBuilder = identityBuilder;
        this._logger = logger;
    }

    public override void Configure()
    {
        this.Get("/callback");
        this.AuthSchemes(OpenIdConnectAuth.CHALLENGE_COOKIE_SCHEME);
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        try
        {
            AuthenticateResult result = await this.HttpContext.AuthenticateAsync(OpenIdConnectAuth.CHALLENGE_SCHEME);

            if (!result.Succeeded)
            {
                this._logger.LogWarning("Authenticating user in the callback path failed.");
                await this.SendRedirectAsync("/");

                return;
            }

            ClaimsPrincipal userPrincipal = await this._identityBuilder.BuildIdentity(result.Principal);

            await Task.WhenAll(
                this.HttpContext.SignInAsync(userPrincipal),
                this.HttpContext.SignOutAsync(OpenIdConnectAuth.CHALLENGE_COOKIE_SCHEME));

            string? returnUrl = this.Query<string>("returnUrl", isRequired: false);

            if (string.IsNullOrWhiteSpace(returnUrl))
            {
                await this.SendRedirectAsync("/");
                return;
            }

            await this.SendRedirectAsync(returnUrl, allowRemoteRedirects: false);
        }
        catch (Exception ex)
        {
            this._logger.LogError(ex, "Failed to build user´s identity");
            await this.SendRedirectAsync("/");
        }
    }
}
