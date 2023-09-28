using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Infrastructure.Interceptors;
internal sealed class SoftDeleteInterceptor : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        if (eventData is null || eventData.Context is null) return result;

        foreach (var entry in eventData.Context.ChangeTracker.Entries())
        {
            if (entry is not { State: EntityState.Deleted, Entity: ISoftDelete deletedEntity })
                continue;

            entry.State = EntityState.Modified;
            deletedEntity.Delete();
        }

        return result;
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
        return ValueTask.FromResult(this.SavingChanges(eventData, result));
    }
}
