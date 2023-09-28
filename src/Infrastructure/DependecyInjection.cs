using Domain.Properties;
using Domain.User;
using Infrastructure.Interceptors;
using Infrastructure.Options;
using Infrastructure.Properties;
using Infrastructure.Repositories;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using UseCases;

namespace Infrastructure;

public static class DependecyInjection
{
    public static void RegisterInfrastructureServices(
        this IServiceCollection services,
        bool isDevelopment,
        SQLServerOptions sqlServerOptions,
        RabbitMQOptions rabbitMQ,
        RedisOptions redisOptions)
    {

        services.AddMediatR();

        services.AddDatabase(sqlServerOptions, isDevelopment);

        services.AddCaching(redisOptions);

        services.AddPubSub(rabbitMQ, isDevelopment);

        services.AddRepositories();
    }

    private static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
    }

    private static void AddPubSub(this IServiceCollection services, RabbitMQOptions rabbitMQOptions, bool isDevelopment)
    {
        services.AddMassTransit(massTransit =>
        {
            massTransit.AddConsumers(typeof(IUseCasesLayerMarker).Assembly);

            massTransit.SetKebabCaseEndpointNameFormatter();

            massTransit.AddEntityFrameworkOutbox<AppDbContext>(outbox =>
            {
                outbox.UseSqlServer();
                outbox.UseBusOutbox();
                outbox.QueryDelay = TimeSpan.FromSeconds(3);
                outbox.DisableInboxCleanupService();
            });

            if (isDevelopment)
            {
                massTransit.UsingRabbitMq((context, config) =>
                {
                    config.Host(rabbitMQOptions.Host, rabbitMQOptions.VirtualHost, h =>
                    {
                        h.Username(rabbitMQOptions.Username);
                        h.Password(rabbitMQOptions.Username);
                    });

                    config.ConfigureEndpoints(context);
                });
            }
        });
    }

    private static void AddDatabase(this IServiceCollection services, SQLServerOptions sqlServerOptions, bool isDevelopment)
    {
        services.AddSingleton<ISqlConnectionFactory, SqlConnectionFactory>();

        services.AddScoped<PublishDomainEventsInterceptor>();
        services.AddScoped<SoftDeleteInterceptor>();

        services.AddDbContext<AppDbContext>(dbContext =>
        {
            dbContext.UseSqlServer(sqlServerOptions.ConnectionString, opts =>
            {
                opts.EnableRetryOnFailure(3);
            });

            dbContext.EnableSensitiveDataLogging(isDevelopment);
        });

        services.AddScoped<IUnitOfWork>(sp =>
        {
            return sp.GetRequiredService<AppDbContext>();
        });
    }

    private static void AddCaching(this IServiceCollection services, RedisOptions redisOptions)
    {
        services.AddStackExchangeRedisCache(opts =>
        {
            opts.Configuration = redisOptions.Configuration;
        });
    }

    private static void AddMediatR(this IServiceCollection services)
    {
        services.AddMediatR(opts =>
        {
            opts.RegisterServicesFromAssemblies(
                typeof(IDomainLayerMarker).Assembly,
                typeof(IUseCasesLayerMarker).Assembly,
                typeof(IInfrastructureLayerMarker).Assembly);
        });
    }
}
