using Microsoft.Data.SqlClient;

namespace KyroStackApp.Application;

public interface ISqlConnectionFactory
{
    /// <summary>
    /// Creates <b>readonly</b> connection to the database. This interface should be mainly used inside <see cref="IQueryHandler{TQuery, TResponse}"/>s.
    /// </summary>
    /// <param name="openConnection">Should the connection be opened immediately</param>
    ValueTask<SqlConnection> CreateConnection(bool openConnection = true);
}
