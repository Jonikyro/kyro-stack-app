using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Options;
public class RedisOptions
{
    [Required]
    public required string Configuration { get; init; }
}
