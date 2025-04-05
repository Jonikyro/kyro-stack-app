namespace KyroStackApp.Shared;

[Serializable]
public class ErrorCodeException : Exception
{
    public ErrorCodeException(string errorCode)
    {
        this.ErrorCode = errorCode;
    }

    public ErrorCodeException(
        string errorCode, 
        int? suggestedStatusCode = null,
        string? message = null,
        Exception? innerException = null,
        object? parameters = null
        ) : base(message, innerException)
    {
        this.ErrorCode = errorCode;
        this.SuggestedStatusCode = suggestedStatusCode;
        this.Parameters = parameters;
    }

    public string ErrorCode { get; }

    /// <summary>
    /// Suggested statuscode to respond with to the client
    /// </summary>
    public int? SuggestedStatusCode { get; }

    /// <summary>
    /// Additional information about the error
    /// </summary>
    public object? Parameters { get; }
}
