using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Options;

public sealed class SQLServerOptions
{
    [Required]
    public required string ConnectionString { get; init; }

    [Required]
    public required string ReadonlyConnectionString { get; init; }
}
