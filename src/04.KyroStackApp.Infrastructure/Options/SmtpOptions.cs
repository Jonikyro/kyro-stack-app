using System.ComponentModel.DataAnnotations;

namespace KyroStackApp.Infrastructure.Options;

public sealed class SmtpOptions
{
    [Required]
    public required string Host { get; init; }
    [Required]
    public int Port { get; init; }

    public TimeSpan ClientTimeout { get; init; } = TimeSpan.FromSeconds(10);
    public string? Username { get; set; }
    public string? Password { get; set; }
    public bool ShouldAuthenticate => this.Username != null || this.Password != null;
}
