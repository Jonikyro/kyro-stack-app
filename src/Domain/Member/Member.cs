namespace Domain.Member;

public sealed partial class Member : Entity, IAggregateRoot<UID>
{
    public UID Id { get; private set; }

    public PersonName Name { get; private set; }

    public DateOnly DateOfBirth { get; private set; }

    public DateOnly JoinedDate { get; private set; }

    public Address Address { get; private set; }
}

public partial class Member
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    private Member() { } // For EF Core
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
}
