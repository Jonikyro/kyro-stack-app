namespace KyroStackApp.Shared;

public abstract class ErrorCodeException : Exception
{
    protected ErrorCodeException(string errorCode, int suggestedStatusCode = 500, string? message = null, Exception? ex = null)
        : base(message, ex)
    {
        this.ErrorCode = errorCode;
        this.StatusCode = suggestedStatusCode;
    }

    /// <summary>
    /// 
    /// </summary>
    public string ErrorCode { get; }

    /// <summary>
    /// Suggested statuscode to send to the client
    /// </summary>
    public int StatusCode { get; }
}
