using KyroStackApp.Infrastructure.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using MimeKit;

namespace KyroStackApp.Infrastructure.Emails;

public sealed class SmtpMailSender(
    SmtpOptions smtpOptions, ILogger<SmtpMailSender> logger) : IMailSender, IDisposable
{
    private readonly SmtpClient _smtpClient = new();
    private readonly SemaphoreSlim _semaphore = new(1, 1);
    private CancellationTokenSource? _cts;

    /// <summary>
    /// Send email via smtp.
    /// </summary>
    /// <remarks>
    /// Creates a new instance of the <see cref="SmtpClient"/> for every email.
    /// Consider using the <see cref="SendAsync(MimeMessage, CancellationToken)"/> for better performance.
    /// </remarks>
    public async Task SendAsync(MimeMessage message)
    {
        // Creates a new SMTP-client for every email
        using SmtpClient smtpClient = new();

        await this.ConnectAsync(smtpClient);

        logger.LogInformation("Sending email");
        await smtpClient.SendAsync(message).ConfigureAwait(false);

        await this.DisconnectAsync(smtpClient);
        logger.LogTrace("Done");
    }

    /// <summary>
    /// Send email via smtp.
    /// </summary>
    /// <returns>
    /// Reuses the <see cref="SmtpClient"/> connection if the connection is still alive for better performance.
    /// </returns>
    public async Task SendAsync(MimeMessage message, CancellationToken ct)
    {
        try
        {
            await this._semaphore.WaitAsync(ct).ConfigureAwait(false);
            await this.ConnectAsync(ct).ConfigureAwait(false);
            _ = await this._smtpClient.SendAsync(message, ct).ConfigureAwait(false);
        }
        finally
        {
            _ = this._semaphore.Release();
        }
    }

    private async Task ConnectAsync(CancellationToken ct)
    {
        if (this._smtpClient.IsConnected)
        {
            logger.LogTrace("Skipping ConnectAsync, reusing existing connection...");
            // Keep the connection alive.
            await this._smtpClient.NoOpAsync(ct).ConfigureAwait(false);
        }
        else
        {
            await this.ConnectAsync(this._smtpClient, ct).ConfigureAwait(false);
        }

        this.ScheduleDisconnect(ct);
    }

    private async Task ConnectAsync(SmtpClient smtpClient, CancellationToken ct = default)
    {
        await smtpClient.ConnectAsync(
            smtpOptions.Host, smtpOptions.Port, SecureSocketOptions.StartTlsWhenAvailable, ct)
            .ConfigureAwait(false);

        if (smtpOptions.ShouldAuthenticate)
        {
            logger.LogTrace("Authenticating");
            await smtpClient.AuthenticateAsync(smtpOptions.Username, smtpOptions.Password, ct)
                .ConfigureAwait(false);
        }
    }

    private void ScheduleDisconnect(CancellationToken ct)
    {
        this._cts?.Cancel();
        this._cts = new();

        _ = Task.Run(async () =>
        {
            try
            {
                await Task.Delay(smtpOptions.ClientTimeout, ct).ConfigureAwait(false);

                try
                {
                    await this._semaphore.WaitAsync(this._cts.Token).ConfigureAwait(false);

                    if (!this._cts.Token.IsCancellationRequested)
                    {
                        await this.DisconnectAsync(this._smtpClient, this._cts.Token).ConfigureAwait(false);
                    }
                }
                finally
                {
                    this._semaphore.Release();
                }
            }
            catch (TaskCanceledException ex)
            {
                logger.LogTrace(ex, "Scheduled disconnect was cancelled");
            }
        }, ct);
    }

    private async Task DisconnectAsync(SmtpClient smtpClient, CancellationToken ct = default)
    {
        logger.LogTrace("Disconnecting");
        await smtpClient.DisconnectAsync(quit: true, ct).ConfigureAwait(false);
    }

    public void Dispose()
    {
        logger.LogTrace("Disposing");

        this._cts?.Cancel();
        this._cts?.Dispose();
        this._smtpClient.Disconnect(quit: true);
        this._smtpClient.Dispose();
        this._semaphore.Dispose();

        GC.SuppressFinalize(this);
    }
}
