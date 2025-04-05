using KyroStackApp.Application.Authentication;
using KyroStackApp.Application.ErrorHandling;

namespace KyroStackApp.Application;

public static class ServiceRegistration
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services,
        bool isDevelopment, 
        OpenIdConnectOptions oidcOptions)
    {
        if (isDevelopment)
        {
            services.AddViteDevServerProxy();
        }

        services.AddExceptionHandler<ErrorCodeExceptionHandler>();

        services.AddScoped<IIdentityBuilder, StubIdentityBuilder>();
        services.AddOpenIdConnectAuthentication(oidcOptions);

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
