using System.ComponentModel.DataAnnotations;

namespace KyroStackApp.Infrastructure.Options;

public class RedisOptions
{
    [Required]
    public required string Configuration { get; init; }
}

