using System.ComponentModel.DataAnnotations;

namespace KyroStackApp.Infrastructure.Options;

public sealed class SqlOptions
{
    [Required]
    public required string ConnectionString { get; init; }

    [Required]
    public required string ReadonlyConnectionString { get; init; }

    public required int MaxRetryCountOnFailure { get; init; }
}
