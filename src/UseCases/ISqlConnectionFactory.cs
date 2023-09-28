using Microsoft.Data.SqlClient;

namespace UseCases;
public interface ISqlConnectionFactory
{
    /// <summary>
    /// Create a <b>readonly</b> connection to sql database.
    /// </summary>
    SqlConnection CreateConnection();
}
