namespace KyroStackApp.Domain;

public interface IEntity<out TId>
{
    public TId Id { get; }
}
