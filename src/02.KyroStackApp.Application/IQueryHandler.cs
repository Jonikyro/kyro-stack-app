namespace KyroStackApp.Application;

public interface IQueryHandler<in TQuery, TResponse> where TQuery : class
{
    public Task<TResponse> HandleAsync(TQuery query, CancellationToken cancellationToken = default);
}

public interface IQueryHandler<TResponse>
{
    public Task<TResponse> HandleAsync(CancellationToken cancellationToken = default);
}
