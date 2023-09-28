namespace Domain;
public interface ISoftDelete
{
    public bool IsDeleted { get; }

    public DateTimeOffset? DeletedAt { get; }

    public void Delete();

    public void UndoDelete();
}
