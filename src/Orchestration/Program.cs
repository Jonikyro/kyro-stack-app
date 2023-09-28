using Infrastructure.Options;
using Orchestration;
using Serilog;

ApiApplication application = new(args, (services, configuration, host, enviroment, webHost) =>
{
    ConfigureLogging(host, configuration);

    var isDevelopment = enviroment.IsDevelopment();
    var enviromentName = enviroment.EnvironmentName;
    Log.Information("Configuring services... (Enviroment: {enviromentName})", enviromentName);

    Log.Information("Adding application options...");
    var databaseOptions = services.AddOptionsFromSection<SQLServerOptions>("SQLServer", configuration);
    var messageBrokerOptions = services.AddOptionsFromSection<RabbitMQOptions>("RabbitMQ", configuration);
    var redisOptions = services.AddOptionsFromSection<RedisOptions>("Redis", configuration);


    services.RegisterAPIServices(isDevelopment);
    services.RegisterDomainServices();
    services.RegisterInfrastructureServices(isDevelopment, databaseOptions, messageBrokerOptions, redisOptions);
    services.RegisterUseCasesServices();
});

static void ConfigureLogging(IHostBuilder host, IConfiguration configuration)
{
    Console.WriteLine("Configuring logging...");

    Log.Logger = new LoggerConfiguration()
        .ReadFrom.Configuration(configuration)
        .CreateLogger();

    host.UseSerilog();
}

Log.Information("Starting application...");
await application.StartAsync();

