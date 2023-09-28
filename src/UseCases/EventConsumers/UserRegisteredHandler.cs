using Emailer.EmailModels;

namespace UseCases.EventConsumers;

public class UserRegisteredHandler : IConsumer<UserRegisteredEvent>
{
    //private readonly IEmailer emailer;

    public UserRegisteredHandler()
    {
        // this.emailer = emailer;
    }

    public async Task Consume(ConsumeContext<UserRegisteredEvent> context)
    {
        var emailConfirmationEmail = new EmailConfirmationEmail(
            context.Message.Email,
            $"{context.Message.Firstname} ${context.Message.Lastname}");

        await context.ConsumeCompleted;
        // await this.emailer.SendEmailConfirmationEmailAsync(emailConfirmationEmail);
    }
}
