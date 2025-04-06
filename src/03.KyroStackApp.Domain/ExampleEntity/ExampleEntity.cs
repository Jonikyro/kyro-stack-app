using KyroStackApp.Domain.ExampleEntity.Events;

namespace KyroStackApp.Domain.ExampleEntity;

public sealed partial class ExampleEntity : Entity
{
    public static ExampleEntity Create(string name)
    {
        return new ExampleEntity(name);
    }

    internal ExampleEntity(string name)
    {
        this.Name = Guard.Against.NullOrWhiteSpace(name);

        this.RaiseEvent(new ExampleEntityCreated(this));
    }

    /// <summary>
    /// EF Core
    /// </summary>
#pragma warning disable CS8618
    private ExampleEntity()
#pragma warning restore CS8618
    {

    }

    public int Id { get; }
    public string Name { get; private set; }
    public DateTimeOffset Created { get; }
}

public sealed partial class ExampleEntity : ISoftDeletable
{
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