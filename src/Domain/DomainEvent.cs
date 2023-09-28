using MediatR;

namespace Domain;

public abstract class DomainEvent : INotification
{
    public DateTimeOffset Occurred { get; } = DateTimeOffset.UtcNow;
}
