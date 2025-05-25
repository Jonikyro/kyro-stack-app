namespace KyroStackApp.Application;

public sealed class Application
{
    private readonly WebApplication _app;

    public Application(string[] args, Action<IServiceCollection, IConfiguration, IHostBuilder, IWebHostEnvironment, IWebHostBuilder> options)
    {
        var builder = WebApplication.CreateBuilder(args);
        options.Invoke(builder.Services, builder.Configuration, builder.Host, builder.Environment, builder.WebHost);

        builder.WebHost.UseKestrel(options =>
        {
            options.AddServerHeader = false;
        });

        this._app = builder.Build();

        this.Lifetime = this._app.Services.GetRequiredService<IHostApplicationLifetime>();

        this._app.UseExceptionHandler(_ => { });

        this._app.UseSecurityHeaders();

        this._app.UseForwardedHeaders();

        if (!this._app.Environment.IsDevelopment())
        {
            this._app.UseHsts();
        }

        this._app.UseHttpsRedirection();

#if (!NoAuth)
        this._app.UseAuthentication();
        this._app.UseAuthorization();
#endif

        this._app.UseOutputCache();

        this._app.MapFastEndpoints();

#if (IncludeUIProject)
        // Wildcard route for any unknown `api` routes
        this._app.MapGet("api/{**unknownRoute}", () =>
        {
            return Results.NotFound();
        });

        if (this._app.Environment.IsDevelopment())
        {
            this._app.MapReverseProxy();
        }
        else
        {
            this._app.UseStaticFiles();
            // For any unknown path that DOES NOT start with "/api/*"
            // fallback to index.html from where the client-side routing
            // will kick in. User should hit this fallback ideally once 
            // or twice depending on how the authentication is implemented.
            //
            // 1. When the user navigates to the site.
            // 2. User returns from external identity provider e.g. KeyClock, Azure AD, etc.
            this._app.MapFallbackToFile("index.html").AllowAnonymous();
        }
#endif
    }

    public IHostApplicationLifetime Lifetime { get; private set; }

    public Task RunAsync()
    {
        return this._app.RunAsync();
    }
}
