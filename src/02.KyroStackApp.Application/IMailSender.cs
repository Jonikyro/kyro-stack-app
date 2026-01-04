using MimeKit;

namespace KyroStackApp.Application;

public interface IMailSender
{
    Task SendAsync(MimeMessage message);
    Task SendAsync(MimeMessage message, CancellationToken ct);
}
