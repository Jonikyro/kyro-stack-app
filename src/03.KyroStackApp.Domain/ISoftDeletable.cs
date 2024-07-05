namespace KyroStackApp.Domain;

public interface ISoftDeletable
{
    public bool IsDeleted { get; }

    public DateTimeOffset? DeletedAt { get; }

    public void Delete();

    public void UndoDelete();
}
