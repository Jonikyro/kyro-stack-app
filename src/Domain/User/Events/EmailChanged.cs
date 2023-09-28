namespace Domain.User.Events;
internal class EmailChanged : DomainEvent
{
    public EmailChanged(UID userId, Email newEmail)
    {
        this.UserId = userId;
        this.NewEmail = newEmail;
    }

    public UID UserId { get; }
    public Email NewEmail { get; }
}
