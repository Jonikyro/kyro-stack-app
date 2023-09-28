using Domain.User.Events;
using MediatR;

namespace UseCases.NotificationHandlers;

internal class NewUserRegisteredHandler : INotificationHandler<NewUserRegistered>
{
    private readonly IPublishEndpoint _publishEndpoint;

    public NewUserRegisteredHandler(IPublishEndpoint publishEndpoint)
    {
        this._publishEndpoint = publishEndpoint;
    }

    public async Task Handle(NewUserRegistered notification, CancellationToken cancellationToken)
    {
        var @event = new UserRegisteredEvent(
            notification.UserId,
            notification.Name.FirstNames,
            notification.Name.Lastname,
            notification.Email.EmailAddress);

        await this._publishEndpoint.Publish(@event, cancellationToken);
    }
}
