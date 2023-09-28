namespace API.Endpoints.Profile;

public static class ProfileEndpoints
{
    public static void MapProfileEndpoints(this IEndpointBuilder builder)
    {
        var group = builder.MapGroup("profile");

        group.MapGet("{userId}", () =>
        {
        });
    }
}


