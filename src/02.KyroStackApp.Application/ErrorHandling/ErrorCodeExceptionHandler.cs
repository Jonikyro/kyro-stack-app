using Microsoft.AspNetCore.Diagnostics;
using System.Net.Mime;
using ProblemDetails = Microsoft.AspNetCore.Mvc.ProblemDetails;

namespace KyroStackApp.Application.ErrorHandling;

public class ErrorCodeExceptionHandler : IExceptionHandler
{
    public const string ERROR_CODE_HEADER = "X-Error-Code";

    private readonly ILogger<ErrorCodeExceptionHandler> _logger;

    public ErrorCodeExceptionHandler(ILogger<ErrorCodeExceptionHandler> logger)
    {
        this._logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken ct)
    {
        if (httpContext.Response.HasStarted) return false;
        if (exception is not ErrorCodeException errorCodeException) return false;

        this._logger.LogError(
            errorCodeException,
            "Application threw ErrorCodeException: {errorCode}",
            [errorCodeException.ErrorCode, errorCodeException.Parameters]);

        httpContext.Response.StatusCode = errorCodeException.SuggestedStatusCode ?? 500;
        httpContext.Response.Headers.TryAdd(ERROR_CODE_HEADER, errorCodeException.ErrorCode);

        var problem = new ProblemDetails
        {
            Detail = errorCodeException.Message ?? errorCodeException.ErrorCode,
            Status = errorCodeException.SuggestedStatusCode ?? 500,
            Type = errorCodeException.ErrorCode,
            Instance = httpContext.Request.Path
        };

        if (errorCodeException.Parameters is not null)
        {
            problem.Extensions.Add("parameters", errorCodeException.Parameters);
        }

        httpContext.Response.ContentType = MediaTypeNames.Application.ProblemJson;
        await httpContext.Response.WriteAsJsonAsync(problem, ct);
        await httpContext.Response.Body.FlushAsync(ct);

        return true;
    }
}
