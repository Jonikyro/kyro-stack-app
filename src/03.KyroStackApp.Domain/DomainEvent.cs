using MediatR;

namespace KyroStackApp.Domain;

public abstract class DomainEvent : INotification
{
    public DateTimeOffset Occurred { get; } = DateTimeOffset.UtcNow;
}
