namespace Shared.Exceptions;
public class UnauthorizedException : ErrorCodeException
{
    public UnauthorizedException(string errorCode)
        : base(errorCode, 403) { }
}
