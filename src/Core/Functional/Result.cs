namespace Shared.Functional;

/// <summary>
/// Represents a type that is holding a value or an exception.
/// </summary>
public readonly struct Result<TSuccessType>
{
    internal readonly bool IsSuccess;
    internal readonly TSuccessType Value;
    internal readonly Exception? Error;

    private Result(Exception error)
    {
        this.IsSuccess = false;
        this.Value = default!;
        this.Error = error;
    }

    private Result(TSuccessType value)
    {
        this.IsSuccess = true;
        this.Value = value;
        this.Error = default;
    }

    public static Result<TSuccessType> Success(TSuccessType success)
    {
        return new Result<TSuccessType>(success);
    }

    public static Result<TSuccessType> Fail(Exception error)
    {
        return new Result<TSuccessType>(error);
    }

    public TReturnType Match<TReturnType>(
        Func<TSuccessType, TReturnType> success,
        Func<Exception, TReturnType> fail)
    {
        return this.IsSuccess
            ? success(this.Value)
            : fail(this.Error!);
    }

    public static implicit operator Result<TSuccessType>(TSuccessType value)
    {
        return new Result<TSuccessType>(value);
    }

    public static implicit operator Result<TSuccessType>(Exception error)
    {
        return new Result<TSuccessType>(error);
    }
}
