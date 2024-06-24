using Domain.User;
using Domain.User.Events;
using MediatR;

namespace UseCases.NotificationHandlers;

internal class NewUserRegisteredHandler : INotificationHandler<NewUserRegistered>
{
    private readonly IPublishEndpoint _publishEndpoint;
    private readonly IUserRepository _repo;
    public NewUserRegisteredHandler(IPublishEndpoint publishEndpoint, IUserRepository repo)
    {
        this._publishEndpoint = publishEndpoint;
        this._repo = repo;
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
