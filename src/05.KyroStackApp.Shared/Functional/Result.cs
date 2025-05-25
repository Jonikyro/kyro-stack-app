using System.Diagnostics.CodeAnalysis;

namespace KyroStackApp.Shared.Functional;

/// <summary>
/// Represents a type that is holding a value or an error.
/// </summary>
public readonly struct Result<TValue, TError>
{
    private readonly bool _isSuccess;
    private readonly TValue? _value;
    private readonly TError? _error;

    private Result(TError error)
    {
        this._isSuccess = false;
        this._value = default;
        this._error = error;
    }

    private Result(TValue value)
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

    public static Result<TValue, TError> Success(TValue success)
    {
        return new Result<TValue, TError>(success);
    }

    public static Result<TValue, TError> Failure(TError error)
    {
        return new Result<TValue, TError>(error);
    }

    public void Match(
        Action<TValue> success,
        Action<TError> failure)
    {
        if (this.IsSuccess)
            success(this._value);
        else
            failure(this._error);
    }

    public TReturnType Match<TReturnType>(
        Func<TValue, TReturnType> success,
        Func<TError, TReturnType> failure)
    {
        return this.IsSuccess
            ? success(this._value)
            : failure(this._error);
    }

    public Task Match(
        Func<TValue, Task> success,
        Func<TError, Task> failure)
    {
        return this.IsSuccess
            ? success(this._value)
            : failure(this._error);
    }

    public ValueTask Match(
        Func<TValue, ValueTask> success,
        Func<TError, ValueTask> failure)
    {
        return this.IsSuccess
            ? success(this._value)
            : failure(this._error);
    }

    public Task<TReturnType> Match<TReturnType>(
        Func<TValue, Task<TReturnType>> success,
        Func<TError, Task<TReturnType>> failure)
    {
        return this.IsSuccess
            ? success(this._value)
            : failure(this._error);
    }

    public ValueTask<TReturnType> Match<TReturnType>(
        Func<TValue, ValueTask<TReturnType>> success,
        Func<TError, ValueTask<TReturnType>> failure)
    {
        return this.IsSuccess
            ? success(this._value)
            : failure(this._error);
    }

    public Task Match(
        Task success,
        Task failure)
    {
        return this.IsSuccess
            ? success
            : failure;
    }

    public ValueTask Match(
        ValueTask success,
        ValueTask failure)
    {
        return this.IsSuccess
            ? success
            : failure;
    }

    public static implicit operator Result<TValue, TError>(TValue value)
    {
        return new Result<TValue, TError>(value);
    }

    public static implicit operator Result<TValue, TError>(TError error)
    {
        return new Result<TValue, TError>(error);
    }

    public bool TryGetValue([NotNullWhen(true)] out TValue? value)
    {
        value = this._value;
        return this.IsSuccess;
    }

    public bool TryGetError([NotNullWhen(true)] out TError? error)
    {
        error = this._error;
        return this.IsFailure;
    }

    public object Value => this.IsSuccess ? this._value : this._error;
}

public static class ResultExtensions
{
    public static Result<TNewValue, TError> Map<TValue, TNewValue, TError>(
        this Result<TValue, TError> result, Func<TValue, TNewValue> map)
    {
        return result.Match(
            (TValue value) => Result<TNewValue, TError>.Success(map(value)),
            Result<TNewValue, TError>.Failure
        );
    }

    public static Result<TValue, TNewError> MapError<TValue, TError, TNewError>(
        this Result<TValue, TError> result, Func<TError, TNewError> mapError)
    {
        return result.Match(
            Result<TValue, TNewError>.Success,
            (TError error) => Result<TValue, TNewError>.Failure(mapError(error))
        );
    }

    public static Result<TValue2, TError> Bind<TValue1, TValue2, TError>(
        this Result<TValue1, TError> result, Func<TValue1, Result<TValue2, TError>> bind)
    {
        return result.Match(
            bind,
            Result<TValue2, TError>.Failure
        );
    }

    public static Result<TValue, Exception> TryF<TValue>(Func<TValue> func)
    {
        try
        {
            return func();
        }
        catch (Exception ex)
        {
            return Result<TValue, Exception>.Failure(ex);
        }
    }

    public static async Task<Result<TValue, Exception>> TryF<TValue>(Task<TValue> task)
    {
        try
        {
            var value = await task;
            return Result<TValue, Exception>.Success(value);
        }
        catch (Exception ex)
        {
            return Result<TValue, Exception>.Failure(ex);
        }
    }

    public static async ValueTask<Result<TValue, Exception>> TryF<TValue>(ValueTask<TValue> task)
    {
        try
        {
            var value = await task;
            return Result<TValue, Exception>.Success(value);
        }
        catch (Exception ex)
        {
            return Result<TValue, Exception>.Failure(ex);
        }
    }
}