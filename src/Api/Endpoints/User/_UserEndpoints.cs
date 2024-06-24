public static class UserEndpoints
{
    public static void MapUserEndpoints(this IEndpointBuilder builder)
    {
        var group = builder.MapGroup("user");

        group.MapGet("profile", async () =>
        {
            await Task.Delay(2000);
            return TypedResults.Ok(new
            {
                firstName = "John",
                lastName = "Doe",
                role = "Admin"
            });
        });
    }
}