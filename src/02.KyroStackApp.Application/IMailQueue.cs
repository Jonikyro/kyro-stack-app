using MimeKit;

namespace KyroStackApp.Application;

public interface IMailQueue
{
    ValueTask QueueMailAsync(MimeMessage message, CancellationToken cancellationToken = default);

    ValueTask<MimeMessage> DequeueMailAsync(CancellationToken cancellationToken = default);
}
