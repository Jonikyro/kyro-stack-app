using Microsoft.Extensions.Options;

namespace KyroStackApp.Orchestration;

/// <summary>
/// Helper class for registering <see cref="IOptions{TOpstions}"/> to the <see cref="IServiceCollection"/>.
/// </summary>
internal static class Options
{
    /// <summary>
    /// Adds the <typeparamref name="TOptions"/> to the <see cref="IServiceCollection"/> both as <see cref="IOptions{TOptions}"/> and <typeparamref name="TOptions"/>.
    /// </summary>
    public static void AddOptionsFromSection<TOptions>(
        this IServiceCollection services,
        string sectionPath) where TOptions : class
    {
        AddOptions<TOptions>(services, sectionPath);
    }

    /// <summary>
    /// Adds the <typeparamref name="TOptions"/> to the <see cref="IServiceCollection"/> both as <see cref="IOptions{TOptions}"/> and <typeparamref name="TOptions"/>.
    /// </summary>
    /// <returns>The <typeparamref name="TOptions"/> with values from set from the <paramref name="configuration"/>.</returns>
    public static TOptions AddOptionsFromSection<TOptions>(
        this IServiceCollection services,
        string sectionPath,
        IConfiguration configuration) where TOptions : class
    {
        AddOptions<TOptions>(services, sectionPath);

        // AddOptions will validate the options
        // so we can cast to non-nullable here.
        return configuration.GetSection(sectionPath).Get<TOptions>()!;
    }

    private static void AddOptions<TOptions>(
        IServiceCollection services,
        string sectionPath) where TOptions : class
    {
        services.AddOptions<TOptions>()
            .BindConfiguration(sectionPath)
            .ValidateDataAnnotations()
            .ValidateOnStart();

        // Register the options class also as a singleton so it can be used without `IOptions` interface.
        services.AddSingleton(registeredServices =>
        {
            return registeredServices.GetRequiredService<IOptions<TOptions>>().Value;
        });
    }
}
