#if (!NoAuth)
using KyroStackApp.Application.Authentication;
#endif
using KyroStackApp.Application.ErrorHandling;

namespace KyroStackApp.Application;

public static class ServiceRegistration
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services,
#if (UseOpenIdConnect)
        bool isDevelopment, 
        OpenIdConnectOptions oidcOptions)
#else
        bool isDevelopment)
#endif
    {
        if (isDevelopment)
        {
            services.AddViteDevServerProxy();
        }

        services.AddExceptionHandler<ErrorCodeExceptionHandler>();

#if (UseOpenIdConnect)
        services.AddScoped<IIdentityBuilder, StubIdentityBuilder>();
        services.AddOpenIdConnectAuthentication(oidcOptions);
#endif

        services.AddAuthorizationBuilder();

        services.AddOutputCache();

        services.AddFastEndpoints();

        services.Scan(scan =>
            scan.FromAssemblyOf<IApplicationLayerMarker>()
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