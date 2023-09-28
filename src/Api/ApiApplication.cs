using Api;
using UseCases;
using UseCases.Users;

namespace API;

public class ApiApplication
{
    private readonly WebApplication _app;
    public ApiApplication(string[] args, Action<IServiceCollection, IConfiguration, IHostBuilder, IWebHostEnvironment, IWebHostBuilder> options)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        options?.Invoke(builder.Services, builder.Configuration, builder.Host, builder.Environment, builder.WebHost);

        this._app = builder.Build();

        // This should be the first middleware registered
        this._app.UseMiddleware<GlobalErrorHandlingMiddelware>();

        this._app.MapLoginEndpoint();

        this._app.MapPost("user", async (
            ICommandHandler<RegisterNewUserCommand> commandHandler,
            CancellationToken ct) =>
        {
            await commandHandler.HandleAsync(
                new RegisterNewUserCommand()
                {
                    City = "Palokka",
                    Email = "jonk@lonk.fi",
                    Firstnames = "Joni Matias",
                    Lastname = "Kyrönlahti"
                },
                ct);

            return TypedResults.Ok();
        });

        if (this._app.Environment.IsDevelopment())
            this._app.MapReverseProxy();
    }

    public Task StartAsync()
    {
        return this._app.RunAsync();
    }
}
