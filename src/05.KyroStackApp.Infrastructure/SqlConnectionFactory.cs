using KyroStackApp.Infrastructure.Options;
using Microsoft.Data.SqlClient;

namespace KyroStackApp.Infrastructure;

internal sealed class SqlConnectionFactory : ISqlConnectionFactory
{
    private readonly SqlOptions _sqlOptions;

    public SqlConnectionFactory(SqlOptions sqlOptions)
    {
        this._sqlOptions = sqlOptions;
    }

    public async ValueTask<SqlConnection> CreateConnection(bool openConnection = true)
    {
        var conn = new SqlConnection(this._sqlOptions.ReadonlyConnectionString);

        if (openConnection) 
        {
            await conn.OpenAsync();
        }

        return conn;
    }
}
