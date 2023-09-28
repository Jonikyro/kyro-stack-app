namespace Orchestration;

internal static class Options
{
    public static void AddOptionsFromSection<TOptions>(
        this IServiceCollection services,
        string sectionPath) where TOptions : class
    {
        AddOptions<TOptions>(services, sectionPath);
    }

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
    }
}
