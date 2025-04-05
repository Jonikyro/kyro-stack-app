using System.Diagnostics.CodeAnalysis;

namespace KyroStackApp.Shared.Functional;

/// <summary>
/// Represents a type that is holding a value or an error.
/// </summary>
public readonly struct Result<TSuccessType, TErrorType>
{
    internal readonly bool _isSuccess;
    internal readonly TSuccessType? _value;
    internal readonly TErrorType? _error;

    private Result(TErrorType error)
    {
        this._isSuccess = false;
        this._value = default;
        this._error = error;
    }

    private Result(TSuccessType value)
    {
        this._isSuccess = true;
        this._value = value;
        this._error = default;
    }

    [MemberNotNullWhen(true, nameof(_value))]
    [MemberNotNullWhen(false, nameof(_error))]
    public bool IsSuccess => _isSuccess;

    [MemberNotNullWhen(false, nameof(_value))]
    [MemberNotNullWhen(true, nameof(_error))]
    public bool IsFailure => !_isSuccess;

    public static Result<TSuccessType, TErrorType> Success(TSuccessType success)
    {
        return new Result<TSuccessType, TErrorType>(success);
    }

    public static Result<TSuccessType, TErrorType> Fail(TErrorType error)
    {
        return new Result<TSuccessType, TErrorType>(error);
    }

    public TReturnType Match<TReturnType>(
        Func<TSuccessType, TReturnType> success,
        Func<TErrorType, TReturnType> fail)
    {
        return this.IsSuccess
            ? success(this._value)
            : fail(this._error);
    }

    public Task<TReturnType> Match<TReturnType>(
        Func<TSuccessType, Task<TReturnType>> success,
        Func<TErrorType, Task<TReturnType>> fail)
    {
        return this.IsSuccess
            ? success(this._value)
            : fail(this._error);
    }

    public void Match(
        Action<TSuccessType> success,
        Action<TErrorType> fail)
    {
        if (this.IsSuccess)
        {
            success(this._value);
        }
        else
        {
            fail(this._error);
        }
    }

    public Task Match(
        Func<TSuccessType, Task> success,
        Func<TErrorType, Task> fail)
    {
        return this.IsSuccess
            ? success(this._value)
            : fail(this._error);
    }

    public static implicit operator Result<TSuccessType, TErrorType>(TSuccessType value)
    {
        return new Result<TSuccessType, TErrorType>(value);
    }

    public static implicit operator Result<TSuccessType, TErrorType>(TErrorType error)
    {
        return new Result<TSuccessType, TErrorType>(error);
    }
}
