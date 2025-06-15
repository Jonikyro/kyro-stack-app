using KyroStackApp.Infrastructure.Interceptors;
using KyroStackApp.Infrastructure.Options;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace KyroStackApp.Infrastructure;

public static class ServiceRegistration
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services,
        bool isDevelopment,
        SqlOptions sqlOptions,
        RabbitMQOptions rabbitMQOptions,
        RedisOptions redisOptions)
    {
        services.AddDatabase(sqlOptions, isDevelopment);

        services.AddCaching(redisOptions);

        services.AddPubSub(rabbitMQOptions, isDevelopment);

        return services;
    }

    private static void AddDatabase(this IServiceCollection services, SqlOptions sqlOptions, bool isDevelopment)
    {
        services.AddSingleton<ISqlConnectionFactory, SqlConnectionFactory>();

        services.AddScoped<PublishDomainEventsInterceptor>();
        services.AddScoped<SoftDeleteInterceptor>();

        services.AddDbContext<AppDbContext>(dbContext =>
        {
            dbContext.UseSqlServer(sqlOptions.ConnectionString, options =>
            {
                options.EnableRetryOnFailure(sqlOptions.MaxRetryCountOnFailure);
            });

            dbContext.EnableSensitiveDataLogging(isDevelopment);
        });

        services.AddScoped<IUnitOfWork>(serviceProvider =>
        {
            return serviceProvider.GetRequiredService<AppDbContext>();
        });
    }

    private static void AddCaching(this IServiceCollection services, RedisOptions redisOptions)
    {
        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = redisOptions.Configuration;
        });
    }

    private static void AddPubSub(this IServiceCollection services, RabbitMQOptions rabbitMQOptions, bool isDevelopment)
    {
        services.AddMassTransit(massTransit =>
        {
            massTransit.AddConsumers(typeof(IApplicationLayerMarker).Assembly);

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
                massTransit.UsingRabbitMq((ctx, config) =>
                {
                    config.Host(rabbitMQOptions.Host, rabbitMQOptions.VirtualHost, h =>
                    {
                        h.Username(rabbitMQOptions.Username);
                        h.Password(rabbitMQOptions.Password);
                    });

                    config.ConfigureEndpoints(ctx);
                });
            }
        });
    }
}
