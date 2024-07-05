namespace KyroStackApp.Domain;
public abstract class Entity
{
    private readonly HashSet<DomainEvent> _domainEvents = [];

    protected void RaiseEvent(DomainEvent domainEvent)
    {
        _ = this._domainEvents.Add(domainEvent);
    }

    public IReadOnlyCollection<DomainEvent> DomainEvents => _domainEvents;

    public void ClearDomainEvents()
    {
        this._domainEvents.Clear();
    }
}