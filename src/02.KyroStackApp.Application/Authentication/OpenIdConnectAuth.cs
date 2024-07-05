using System.Net;

namespace KyroStackApp.Application.Authentication;

file interface IOpenIdConnect { }

public sealed class OpenIdConnectOptions
{
    public required string Authority { get; init; }
    public required string ClientId { get; init; }
    public required string ClientSecret { get; init; }
    public string? ResponseType { get; init; }
    public bool? UsePkce { get; init; }
}

public static class OpenIdConnectAuth
{
    public const string LOGIN_SCHEME = "CookieScheme";
    public const string CHALLENGE_SCHEME = "OpenIdConnectScheme";
    public const string CHALLENGE_COOKIE_SCHEME = "OpenIdConnectCookieScheme";

    public const string LOGIN_PATH = "/login";
    public const string LOGOUT_PATH = "/logout";

    public static void AddOpenIdConnectAuthentication(this IServiceCollection services, OpenIdConnectOptions oidcOptions)
    {
        services.AddAuthentication((options) =>
        {
            options.DefaultScheme = LOGIN_SCHEME;
            options.DefaultChallengeScheme = CHALLENGE_SCHEME;
        })
        .AddCookie(authenticationScheme: LOGIN_SCHEME, (options) =>
        {
            options.Cookie.Name = "__Host-KyroStackApp.Session";
            options.Cookie.SameSite = SameSiteMode.Lax;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
            options.Cookie.MaxAge = TimeSpan.FromMinutes(30);

            options.SlidingExpiration = true;
            options.LoginPath = LOGIN_PATH;
            options.LogoutPath = LOGOUT_PATH;

            options.Events.OnRedirectToLogin = ctx =>
            {
                ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;

                return Task.CompletedTask;
            };

            options.Events.OnRedirectToAccessDenied = ctx =>
            {
                ctx.Response.StatusCode = (int)HttpStatusCode.Forbidden;

                return Task.CompletedTask;
            };
        })
        //.AddOpenIdConnect(CHALLENGE_COOKIE_SCHEME, (options) =>
        //{
        //    // Store the claims from external auth provider into the `CHALLENGE_COOKIE_SCHEME` cookie.
        //    // This way the login cookie only contains the claims set by YOU.
        //    options.SignInScheme = CHALLENGE_COOKIE_SCHEME;
        //    options.Authority = oidcOptions.Authority;
        //    options.ClientId = oidcOptions.ClientId;
        //    options.ClientSecret = oidcOptions.ClientSecret;
            
        //    options.ResponseType = oidcOptions.ResponseType ?? "code";
        //    options.UsePkce = oidcOptions.UsePkce ?? true;
        //    options.SaveTokens = false;

        //    options.Scope.Clear();
        //    options.Scope.Add("openid");

        //    options.Events.OnRemoteFailure = ctx =>
        //    {
        //        ILogger logger = ctx.HttpContext.RequestServices.GetRequiredService<ILogger<IOpenIdConnect>>();

        //        logger.LogError("Remote authentication failed");

        //        ctx.HandleResponse();
        //        ctx.Response.Redirect(LOGIN_PATH);
        //        return Task.CompletedTask;
        //    };
        //});
        ;
    }
}
