using Mediator;

namespace KyroStackApp.Domain;

public abstract class DomainEvent : INotification
{
    public DateTimeOffset PublishedUtc { get; } = DateTimeOffset.UtcNow;
}
