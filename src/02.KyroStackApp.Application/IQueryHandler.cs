namespace KyroStackApp.Application;

public interface IQueryHandler<in TQuery, TResponse> where TQuery : class
{
    Task<TResponse> HandleAsync(TQuery query, CancellationToken cancellationToken = default);
}

public interface IQueryHandler<TResponse>
{
    Task<TResponse> HandleAsync(CancellationToken cancellationToken = default);
}
