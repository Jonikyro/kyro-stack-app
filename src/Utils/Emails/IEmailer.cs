using Emailer.EmailModels;

namespace Emailer;
public interface IEmailer
{
    public Task SendEmailConfirmationEmailAsync(EmailConfirmationEmail emailConfirmationEmail);
}
