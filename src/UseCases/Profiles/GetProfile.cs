namespace UseCases.Profiles;

public sealed record UserProfile(
    string Id,
    string Name,
    string Email,
    string Nickname,
    NotificationSettings NotificationSettings);

public sealed record NotificationSettings(bool SendEmails);

public sealed class GetProfileQuery : IQuery
{
    public GetProfileQuery(string id)
    {
        this.Id = id;
    }

    public string Id { get; }
}

public sealed class GetProfileQueryHandler : IQueryHandler<GetProfileQuery, UserProfile>
{
    public GetProfileQueryHandler(ISqlConnectionFactory connectionFactory)
    {

    }

    public Task<UserProfile> HandleQuery(GetProfileQuery query)
    {
        throw new NotImplementedException();
    }
}
