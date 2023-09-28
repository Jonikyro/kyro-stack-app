using Microsoft.Extensions.DependencyInjection;

namespace UseCases;

public static class DependencyInjection
{
    public static void RegisterUseCasesServices(this IServiceCollection services)
    {
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
    }
}
