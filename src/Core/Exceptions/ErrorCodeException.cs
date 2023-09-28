namespace Shared.Exceptions;

[Serializable]
public abstract class ErrorCodeException : Exception
{
    public ErrorCodeException(string errorCode, int statusCode = 500, string? message = null)
        : base(message)
    {
        this.ErrorCode = errorCode;
        this.StatusCode = statusCode;
    }

    public string ErrorCode { get; }

    public int StatusCode { get; }
}
