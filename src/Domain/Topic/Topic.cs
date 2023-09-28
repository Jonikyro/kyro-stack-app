namespace Domain.Topic;

public sealed partial class Topic : Entity, IEntity<UID>
{
    public UID Id { get; private set; }

    public string Name { get; private set; }
}

public partial class Topic
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    private Topic() { } // For EF Core
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
}
