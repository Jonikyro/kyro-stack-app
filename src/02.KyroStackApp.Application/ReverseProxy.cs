using Yarp.ReverseProxy.Configuration;

namespace KyroStackApp.Application;

internal static class ReverseProxy
{
    private const string VITE_CLUSTER_ID = "vite-dev-cluster";

    public static void AddViteDevServerProxy(this IServiceCollection services)
    {
        services.AddReverseProxy().LoadFromMemory(GetRoutes(), GetClusters());
    }

    private static List<RouteConfig> GetRoutes()
    {
        return [
            new RouteConfig {
                ClusterId = VITE_CLUSTER_ID,
                RouteId = "vite-dev-route",
                Match = new RouteMatch {
                    Path = "{**catch-all}",
                    Hosts = ["localhost"],
                }
            }
        ];
    }

    private static List<ClusterConfig> GetClusters()
    {
        return [
            new ClusterConfig {
                ClusterId = VITE_CLUSTER_ID,
                Destinations = new Dictionary<string, DestinationConfig> {
                     { "asd", new DestinationConfig { Address = "http://localhost:5173/" } }
                }
            }
        ];
    }
}
