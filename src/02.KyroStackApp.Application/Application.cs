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

        this._app.UseAuthentication();
        this._app.UseAuthorization();

        this._app.UseOutputCache();

        this._app.MapFastEndpoints();

        if (this._app.Environment.IsDevelopment())
        {
            this._app.MapReverseProxy();
        }
        else
        {
            this._app.UseStaticFiles();

            // Wildcard route for any unknown `api` routes
            this._app.MapGet("api/{**unknownRoute}", () =>
            {
                return Results.NotFound();
            });

            this._app.MapFallbackToFile("index.html").AllowAnonymous();
        }
    }

    public IHostApplicationLifetime Lifetime { get; private set; }

    public Task RunAsync()
    {
        return this._app.RunAsync();
    }
}
