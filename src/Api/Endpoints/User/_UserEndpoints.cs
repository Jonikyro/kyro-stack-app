public static class UserEndpoints
{
    public static void MapUserEndpoints(this IEndpointBuilder builder)
    {
        var group = builder.MapGroup("profile");
    }
}