namespace KyroStackApp.Shared;

/// <summary>
/// Type of <see cref="Exception"/> that is used to represent errors with specific error codes.
/// These error codes are usually documented in the API documentation.
/// <see cref="ErrorCodeException"/> should have a global error handler that converts the exception
/// to a format that is suitable for API responses.
/// </summary>
/// 
/// <remarks>
/// It's often a good idea to inherit from this class to create named <see cref="ErrorCodeException"/>s.
/// </remarks>
public class ErrorCodeException : Exception
{
    public ErrorCodeException(
        string errorCode, 
        int? suggestedStatusCode = null,
        string? message = null,
        Exception? innerException = null,
        object? parameters = null
        ) : base(message ?? errorCode, innerException)
    {
        this.ErrorCode = errorCode;
        this.SuggestedStatusCode = suggestedStatusCode;
        this.Parameters = parameters;
    }

    /// <summary>
    /// Unique code that identifies the error
    /// </summary>
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
