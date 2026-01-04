using Mediator;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace KyroStackApp.Infrastructure.Interceptors;

internal sealed class PublishDomainEventsInterceptor : SaveChangesInterceptor
{
    private readonly IPublisher _publisher;

    public PublishDomainEventsInterceptor(IPublisher publisher)
    {
        this._publisher = publisher;
    }

    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        this.PublishDomainEvents(eventData.Context).GetAwaiter().GetResult();
        return result;
    }

    public override async ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        await this.PublishDomainEvents(eventData.Context, cancellationToken).ConfigureAwait(false);
        return result;
    }

    private async Task PublishDomainEvents(DbContext? dbContext, CancellationToken cancellationToken = default)
    {
        if (dbContext is null) return;

        List<Entity> entitiesWithDomainEvents = dbContext.ChangeTracker.Entries<Entity>()
            .Where(entry => entry.Entity.DomainEvents.Any())
            .Select(entry => entry.Entity)
            .ToList();

        DomainEvent[] raisedDomainEvents = entitiesWithDomainEvents.SelectMany(entity => entity.DomainEvents.Select(x => x)).ToArray();

        // We have to clear the domain-events before publishing to avoid infinite recursion.
        entitiesWithDomainEvents.ForEach(entity => entity.ClearDomainEvents());

        foreach (DomainEvent? domainEvent in raisedDomainEvents)
        {
            await this._publisher.Publish(domainEvent, cancellationToken);
        }
    }
}