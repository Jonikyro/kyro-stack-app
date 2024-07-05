using KyroStackApp.Application.Authentication;

namespace KyroStackApp.Application;

public static class ServiceRegistration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, bool isDevelopment)
    {
        if (isDevelopment)
        {
            services.AddViteDevServerProxy();
        }

        services.AddOpenIdConnectAuthentication(new OpenIdConnectOptions() { Authority = "", ClientId = "", ClientSecret = "", });

        services.AddAuthorizationBuilder();

        services.AddOutputCache();

        services.AddFastEndpoints();

        services.Scan(scan =>
            scan.FromCallingAssembly()
                .AddClasses(classes => classes.AssignableTo(typeof(ICommandHandler<>)))
                    .AsImplementedInterfaces()
                .AddClasses(classes => classes.AssignableTo(typeof(ICommandHandler<,>)))
                    .AsImplementedInterfaces()
                .AddClasses(classes => classes.AssignableTo(typeof(IQueryHandler<>)))
                    .AsImplementedInterfaces()
                .AddClasses(classes => classes.AssignableTo(typeof(IQueryHandler<,>)))
                    .AsImplementedInterfaces());

        return services;
    }
}
