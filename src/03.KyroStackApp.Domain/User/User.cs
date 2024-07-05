namespace KyroStackApp.Domain.User;

public sealed partial class User : Entity, ISoftDeletable
{
    // Creation

    public static User Create(string name)
    {
        return new User(name);
    }

    internal User(string name)
    {
        this.Id = UId.Create();
        this.Name = Guard.Against.NullOrWhiteSpace(name);
    }

    /// <summary>
    /// EF Core
    /// </summary>
#pragma warning disable CS8618
    private User()
#pragma warning restore CS8618
    {

    }
}

public partial class User
{
    // Properties

    public UId Id { get; }

    public string Name { get; }
}

public partial class User
{
    // Softdelete funtionality

    public bool IsDeleted { get; private set; }

    public DateTimeOffset? DeletedAt { get; private set; }

    public void Delete()
    {
        this.IsDeleted = true;
        this.DeletedAt = DateTimeOffset.Now;
    }

    public void UndoDelete()
    {
        this.IsDeleted = false;
        this.DeletedAt = default;
    }
}