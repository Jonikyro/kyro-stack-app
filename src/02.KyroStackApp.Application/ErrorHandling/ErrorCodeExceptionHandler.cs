using Microsoft.AspNetCore.Diagnostics;

namespace Application.ErrorHandling;

public class ErrorCodeExceptionHandler : IExceptionHandler
{
    public const string ERROR_CODE_HEADER = "X-Error-Code";

    private readonly ILogger<ErrorCodeExceptionHandler> _logger;

    public ErrorCodeExceptionHandler(ILogger<ErrorCodeExceptionHandler> logger)
    {
        this._logger = logger;
    }

    public ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if (exception is not ErrorCodeException errorCodeException)
        {
            return ValueTask.FromResult(false);
        }

        this._logger.LogError(exception, exception.Message);

        // Clear the body if possible
        if (!httpContext.Response.HasStarted && httpContext.Response.Body.CanSeek)
        {
            httpContext.Response.Body.SetLength(0);
        }

        httpContext.Response.StatusCode = errorCodeException.StatusCode;
        httpContext.Response.Headers.TryAdd(ERROR_CODE_HEADER, errorCodeException.ErrorCode);

        return ValueTask.FromResult(true);
    }
}
