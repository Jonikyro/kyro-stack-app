using Infrastructure.Options;
using Microsoft.Data.SqlClient;
using UseCases;

namespace Infrastructure;

internal class SqlConnectionFactory : ISqlConnectionFactory
{
    private readonly SQLServerOptions _databaseOptions;

    public SqlConnectionFactory(IOptions<SQLServerOptions> options)
    {
        this._databaseOptions = options.Value;
    }

    public SqlConnection CreateConnection()
    {
        return new SqlConnection(this._databaseOptions.ReadonlyConnectionString);
    }
}
