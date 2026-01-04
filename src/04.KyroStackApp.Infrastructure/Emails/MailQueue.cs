using MimeKit;
using System.Threading.Channels;

namespace KyroStackApp.Infrastructure.Emails;

public sealed record MailQueueOptions
{
    /// <summary>
    /// How many emails fit into the queue.
    /// </summary>
    /// <remarks>
    /// If the buffer is full, writing is blocked until the there is free space once again.
    /// </remarks>
    public int Capacity { get; init; } = 100;

    /// <summary>
    /// Is there only 1 consumer for the queue.
    /// </summary>
    /// <remarks>
    /// Defaults to `true`.
    /// </remarks>
    public bool SingleReader { get; init; } = true;

    /// <summary>
    /// Is there only 1 producer for the queue.
    /// </summary>
    /// <remarks>
    /// Defaults to `false`.
    /// </remarks>
    public bool SingleWriter { get; set; } = false;
}

internal class MailQueue : IMailQueue
{
    private readonly Channel<MimeMessage> _channel;

    public MailQueue(MailQueueOptions? options)
    {
        options ??= new MailQueueOptions();

        BoundedChannelOptions channelOptions = new(options.Capacity)
        {
            FullMode = BoundedChannelFullMode.Wait,
            SingleReader = options.SingleReader,
            SingleWriter = options.SingleWriter
        };

        this._channel = Channel.CreateBounded<MimeMessage>(channelOptions);
    }

    public ValueTask<MimeMessage> DequeueMailAsync(CancellationToken cancellationToken = default)
    {
        return this._channel.Reader.ReadAsync(cancellationToken);
    }

    public ValueTask QueueMailAsync(MimeMessage message, CancellationToken cancellationToken = default)
    {
        return this._channel.Writer.WriteAsync(message, cancellationToken);
    }
}
