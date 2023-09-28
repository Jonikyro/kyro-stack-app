namespace Domain.User;

public sealed partial class Profile : Entity, IEntity<UID>
{
    public UID Id { get; private set; }

    public Address Address { get; private set; }

    public Email Email { get; private set; }
}

public partial class Profile
{
    internal bool ChangeEmail(Email email)
    {
        if (this.Email == email) return false;
        this.Email = email;
        return true;
    }
}

public partial class Profile
{
    public static Profile Create(Address address, Email email)
    {
        return new Profile()
        {
            Id = UID.Create(),
            Email = email,
            Address = address
        };
    }
}

public partial class Profile
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    private Profile() { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
}
