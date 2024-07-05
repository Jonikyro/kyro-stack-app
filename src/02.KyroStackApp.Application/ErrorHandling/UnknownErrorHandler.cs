using Microsoft.AspNetCore.Diagnostics;

namespace Application.ErrorHandling;

public class UnknownErrorHandler : IExceptionHandler
{
    private readonly ILogger<UnknownErrorHandler> _logger;

    public UnknownErrorHandler(ILogger<UnknownErrorHandler> logger)
    {
        this._logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        this._logger.LogCritical(exception, "Unknown error occured in route {Route}", httpContext.Request.Path.Value);

        if (!httpContext.Response.HasStarted && httpContext.Response.Body.CanSeek)
        {
            httpContext.Response.Body.SetLength(0);
            httpContext.Response.ContentType = "text/plain";
            await httpContext.Response.WriteAsync("Unknown error", cancellationToken);
        }

        httpContext.Response.StatusCode = 500;

        return true;
    }
}
