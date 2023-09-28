using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Options;
public sealed class RabbitMQOptions
{
    [Required]
    public required string Host { get; init; }

    [Required]
    public required string VirtualHost { get; init; }

    [Required]
    public required string Username { get; init; }

    [Required]
    public required string Password { get; init; }
}
