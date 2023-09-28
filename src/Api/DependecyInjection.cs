using Api;
using API.Properties;

namespace API;

public static class DependecyInjection
{
    public static void RegisterAPIServices(this IServiceCollection services, bool isDevelopment)
    {
        if (isDevelopment)
            services.ConfigureReverseProxy();

        // Register all classes inheriting AbstractValidator<T> as IValidator<T>
        // (Assembly scanning)
        services.AddValidatorsFromAssemblyContaining(typeof(IAPILayerMarker));

        services.AddProblemDetails(opts =>
        {
            const string VALIDATION_ERROR_HEADER = "X-Validation-Error";
            opts.CustomizeProblemDetails = (context) =>
            {
                context.HttpContext.Response.Headers.TryAdd(VALIDATION_ERROR_HEADER, "1");
            };
        });
    }
}
