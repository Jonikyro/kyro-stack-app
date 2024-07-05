namespace KyroStackApp.Shared.Functional;

/// <summary>
/// Represents a type that is holding a value or an exception.
/// </summary>
public readonly struct Result<TSuccessType>
{
    internal readonly bool _isSuccess;
    internal readonly TSuccessType _value;
    internal readonly Exception? _error;

    private Result(Exception error)
    {
        this._isSuccess = false;
        this._value = default!;
        this._error = error;
    }

    private Result(TSuccessType value)
    {
        this._isSuccess = true;
        this._value = value;
        this._error = default;
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
        return this._isSuccess
            ? success(this._value)
            : fail(this._error!);
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
