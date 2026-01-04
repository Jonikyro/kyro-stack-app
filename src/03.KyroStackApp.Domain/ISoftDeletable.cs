namespace KyroStackApp.Domain;

public interface ISoftDeletable
{
    bool IsDeleted { get; }

    DateTimeOffset? DeletedAt { get; }

    void Delete();

    void UndoDelete();
}
