using Yarp.ReverseProxy.Configuration;

namespace Api;

internal static class ReverseProxy
{
    /// <summary>
    /// Configure YARP reverse proxy.
    /// </summary>
    public static void ConfigureReverseProxy(this IServiceCollection services)
    {
        services
            .AddReverseProxy()
            .LoadFromMemory(ConfigureRoutes(), ConfigureClusters());
    }

    private static List<RouteConfig> ConfigureRoutes()
    {
        return new List<RouteConfig> {
                new()
                {
                    ClusterId = "vite-dev-cluster",
                    RouteId = "vite-dev-route",
                    Match = new RouteMatch
                    {
                        Path = "{**catch-all}",
                        Hosts = new List<string>{ "localhost" }
                    }
                }
            };
    }

    private static List<ClusterConfig> ConfigureClusters()
    {
        return new List<ClusterConfig> {
                new()
                {
                    ClusterId = "vite-dev-cluster",
                    Destinations = new Dictionary<string, DestinationConfig>()
                    {
                        { "vite-dev-server", new DestinationConfig()
                            {
                                Address = "http://localhost:5173/"
                            }
                        }
                    }
                }
            };
    }
}
