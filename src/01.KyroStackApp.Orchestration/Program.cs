using KyroStackApp.Application.Authentication;
using KyroStackApp.Infrastructure;
using KyroStackApp.Infrastructure.Options;
using Orchestration;
using ApiApplication = KyroStackApp.Application.Application;

// Create a boostrap logger so that we can log things before the DI-container is build
// https://nblumhardt.com/2020/10/bootstrap-logger/
Log.Logger = new LoggerConfiguration()
    .WriteTo
    .Console()
    .CreateBootstrapLogger();

ApiApplication app = new(args, (services, configuration, hostBuilder, hostEnvironment, webHostBuilder) =>
{
    var isDevelopment = hostEnvironment.IsDevelopment();

    ConfigureLogging(hostBuilder);

    hostBuilder.UseDefaultServiceProvider(options =>
    {
        options.ValidateOnBuild = true;
    });

    services.AddMediatR(options =>
    {
        options.RegisterServicesFromAssemblies(
            typeof(IApplicationLayerMarker).Assembly,
            typeof(IDomainLayerMarker).Assembly,
            typeof(IInfrastructureLayerMarker).Assembly);
    });

    OpenIdConnectOptions oidcOptions = services.AddOptionsFromSection<OpenIdConnectOptions>("OpenIdConnect", configuration);
    SqlOptions sqlOptions = services.AddOptionsFromSection<SqlOptions>("SQLServer", configuration);
    RabbitMQOptions rabbitMQOptions = services.AddOptionsFromSection<RabbitMQOptions>("RabbitMQ", configuration);
    RedisOptions redisOptions = services.AddOptionsFromSection<RedisOptions>("Redis", configuration);

    services
        .AddApplicationServices(isDevelopment, oidcOptions)
        .AddDomainServices()
        .AddInfrastructureServices(isDevelopment, sqlOptions, rabbitMQOptions, redisOptions);
});

app.Lifetime.ApplicationStopping.Register(async () =>
{
    // Flush the logs in queue before the application stops
    await Log.CloseAndFlushAsync();
});

static void ConfigureLogging(IHostBuilder hostBuilder)
{
    hostBuilder.ConfigureLogging(options =>
    {
        options.ClearProviders();
    });

    hostBuilder.UseSerilog((ctx, services, configuration) =>
    {
        configuration
            .ReadFrom
                .Configuration(ctx.Configuration)
            .ReadFrom
                .Services(services);
    });
}

await app.RunAsync();