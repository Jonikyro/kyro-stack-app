using Emailer.EmailModels;

namespace Emailer;
internal sealed class ConsoleEmailer : IEmailer
{
    public Task SendEmailConfirmationEmailAsync(EmailConfirmationEmail emailConfirmationEmail)
    {
        Console.WriteLine(emailConfirmationEmail);
        return Task.CompletedTask;
    }
}
