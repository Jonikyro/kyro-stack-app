namespace Domain.User.Events;
public class NewUserRegistered : DomainEvent
{
    internal NewUserRegistered(UID userId, PersonName name, Email email)
    {
        this.UserId = userId;
        this.Name = name;
        this.Email = email;
    }

    public UID UserId { get; }
    public PersonName Name { get; }
    public Email Email { get; }
}
