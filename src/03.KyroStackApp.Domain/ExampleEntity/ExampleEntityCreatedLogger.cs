using KyroStackApp.Domain.ExampleEntity.Events;
using Mediator;
using Microsoft.Extensions.Logging;

namespace KyroStackApp.Domain.ExampleEntity;
public class ExampleEntityCreatedLogger : INotificationHandler<ExampleEntityCreated>
{
    private readonly ILogger<ExampleEntityCreatedLogger> _logger;

    public ExampleEntityCreatedLogger(ILogger<ExampleEntityCreatedLogger> logger)
    {
        this._logger = logger;
    }

    public ValueTask Handle(ExampleEntityCreated notification, CancellationToken cancellationToken)
    {
        this._logger.LogInformation("ExampleEntity {Name} created!", notification.ExampleEntity.Name);
        return ValueTask.CompletedTask;
    }
}

