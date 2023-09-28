using Microsoft.Extensions.DependencyInjection;

namespace Emailer;
public static class DependencyInjection
{
    public static void RegisterApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IEmailer>();
    }
}