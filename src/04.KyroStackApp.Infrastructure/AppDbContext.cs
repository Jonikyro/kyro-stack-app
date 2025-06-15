﻿using KyroStackApp.Infrastructure.Interceptors;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;

namespace KyroStackApp.Infrastructure;

internal sealed class AppDbContext : DbContext, IUnitOfWork
{
    private readonly SoftDeleteInterceptor _softDeleteInterceptor;
    private readonly PublishDomainEventsInterceptor _publishDomainEventsInterceptor;

    public AppDbContext(
        DbContextOptions<AppDbContext> dbContextOptions,
        SoftDeleteInterceptor softDeleteInterceptor,
        PublishDomainEventsInterceptor domainEventsInterceptor)
        : base(dbContextOptions)
    {
        this._softDeleteInterceptor = softDeleteInterceptor;
        this._publishDomainEventsInterceptor = domainEventsInterceptor;
    }

    public async Task<ITransaction> BeginTransactionAsync(
        IsolationLevel isolationLevel, CancellationToken cancellationToken = default)
    {
        var tx = await base.Database.BeginTransactionAsync(isolationLevel, cancellationToken);
        return new TransactionFacade(tx);
    }

    public async Task<ITransaction> BeginTransactionAsync(CancellationToken cancellationToken = default)
    {
        var tx = await this.Database.BeginTransactionAsync(cancellationToken);
        return new TransactionFacade(tx);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(_softDeleteInterceptor);
        optionsBuilder.AddInterceptors(_publishDomainEventsInterceptor);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("kyro");

        // Classes implementing IEntityTypeConfiguration<TEntity>
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        // Add "OutboxMessage" and "OutboxState" tables.
        // Masstransit uses these tables to implement the Outbox-pattern.
        modelBuilder.AddOutboxMessageEntity();
        modelBuilder.AddOutboxStateEntity();

        modelBuilder.Ignore<DomainEvent>();
    }
}

internal sealed class TransactionFacade : ITransaction
{
    private readonly IDbContextTransaction _tx;

    public TransactionFacade(IDbContextTransaction tx)
    {
        this._tx = tx;
    }

    public Task CommitAsync(CancellationToken cancellationToken = default)
    {
        return this._tx.CommitAsync(cancellationToken);
    }

    public void Dispose()
    {
        this._tx.Dispose();
    }

    public ValueTask DisposeAsync()
    {
        return this._tx.DisposeAsync();
    }

    public Task RollbackAsync(CancellationToken cancellationToken = default)
    {
        return this._tx.RollbackAsync(cancellationToken);
    }
}
