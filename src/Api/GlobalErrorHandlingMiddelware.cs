
using Shared.Exceptions;

namespace Api;

public class GlobalErrorHandlingMiddelware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalErrorHandlingMiddelware> _logger;

    public const string ERROR_CODE_HEADER = "X-Error-Code";

    public GlobalErrorHandlingMiddelware(RequestDelegate next, ILogger<GlobalErrorHandlingMiddelware> logger)
    {
        this._logger = logger;
        this._next = next;
    }
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await this._next(context);
        }
        catch (ErrorCodeException ex)
        {
            this._logger.LogError(ex, ex.Message);
            HandleErrorCodeException(context, ex);
        }
        catch (Exception ex)
        {
            this._logger.LogCritical(ex, "Unknown error happened in route: {route}", context.Request.Path.Value);

            context.Response.StatusCode = 500;
            context.Response.ContentType = "text/plain";
            // TODO: Write stacktrace if development
            await context.Response.WriteAsync("Unknown error");
        }
    }

    private static void HandleErrorCodeException(HttpContext context, ErrorCodeException ex)
    {
        context.Response.StatusCode = ex.StatusCode;
        context.Response.Headers.TryAdd(ERROR_CODE_HEADER, ex.ErrorCode);
    }
}