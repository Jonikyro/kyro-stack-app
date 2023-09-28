using Domain.User.Events;

namespace Domain.User;

public sealed partial class User : Entity, IAggregateRoot<UID>, ISoftDelete
{
    // Fields and properties

    public UID Id { get; private set; }

    public PersonName Name { get; private set; }

    //public DateOnly DateOfBirth { get; private set; }

    public Profile Profile { get; private set; }
}

public partial class User
{
    public void ChangeEmail(Email email)
    {
        if (this.Profile.ChangeEmail(email))
        {
            this.RaiseEvent(new EmailChanged(this.Id, this.Profile.Email));
        }
    }
}

public partial class User
{
    // Instantiation

    public static User Create(PersonName name, Profile profile)
    {
        return new User(name, profile);
    }

    internal User(PersonName name, Profile profile)
    {
        this.Id = UID.Create();
        this.Name = Guard.Against.Null(name);
        this.Profile = Guard.Against.Null(profile);

        this.RaiseEvent(new NewUserRegistered(this.Id, this.Name, this.Profile.Email));
    }
}

public partial class User
{
    // Safe delete funtionality

    public bool IsDeleted { get; private set; }

    public DateTimeOffset? DeletedAt { get; private set; }

    public void Delete()
    {
        IsDeleted = true;
        DeletedAt = DateTimeOffset.Now;
    }

    public void UndoDelete()
    {
        IsDeleted = false;
        DeletedAt = default;
    }
}

public partial class User
{
    // Ef Core

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    private User() { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
}

