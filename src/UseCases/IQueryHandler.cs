namespace UseCases;

public interface IQueryHandler<in TQuery, TResponse> where TQuery : IQuery
{
    public Task<TResponse> HandleQuery(TQuery query);
}

public interface IQueryHandler<TResponse>
{
    public Task<TResponse> HandleQuery();
}
