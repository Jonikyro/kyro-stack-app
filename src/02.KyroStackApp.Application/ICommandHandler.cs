namespace KyroStackApp.Application;

public interface ICommandHandler<in TCommand, TResponse> where TCommand : class
{
    Task<TResponse> HandleAsync(TCommand command, CancellationToken cancellationToken = default);
}

public interface ICommandHandler<in TCommand> where TCommand : class
{
    Task HandleAsync(TCommand command, CancellationToken cancellationToken = default);
}