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

    [MemberNotNullWhen(true, nameof(Value))]
    [MemberNotNullWhen(false, nameof(Error))]
    public bool IsSuccess => _isSuccess;

    [MemberNotNullWhen(false, nameof(Value))]
    [MemberNotNullWhen(true, nameof(Error))]
    public bool IsFailure => !_isSuccess;

    public TValue? Value
    {
        get
        {
            if (this.IsFailure)
            {
                throw new InvalidOperationException("Cannot access Value on a failure result.");
            }

            return this._value;
        }
    }

    public TError? Error
    {
        get
        {
            if (this.IsSuccess)
            {
                throw new InvalidOperationException("Cannot access Error on a success result.");
            }

            return this._error;
        }
    }

    public static Result<TValue, TError> Success(TValue success)
    {
        return new Result<TValue, TError>(success);
    }

    public static Result<TValue, TError> Failure(TError error)
    {
        return new Result<TValue, TError>(error);
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
}

public static class ResultExtensions
{
    // Syncronous extensions

    public static Result<TNewValue, TError> Map<TValue, TNewValue, TError>(
        this Result<TValue, TError> result,
        Func<TValue, TNewValue> map)
    {
        return result.IsSuccess
            ? Result<TNewValue, TError>.Success(map(result.Value))
            : Result<TNewValue, TError>.Failure(result.Error);
    }

    public static Result<TValue, TNewError> MapError<TValue, TError, TNewError>(
        this Result<TValue, TError> result,
        Func<TError, TNewError> mapError)
    {
        return result.IsSuccess
            ? Result<TValue, TNewError>.Success(result.Value)
            : Result<TValue, TNewError>.Failure(mapError(result.Error));
    }

    public static Result<TNewValue, TError> Bind<TValue, TNewValue, TError>(
        this Result<TValue, TError> result,
        Func<TValue, Result<TNewValue, TError>> bind)
    {
        return result.IsSuccess
            ? bind(result.Value)
            : Result<TNewValue, TError>.Failure(result.Error);
    }

    public static TReturnValue Match<TReturnValue, TValue, TError>(
        this Result<TValue, TError> result,
        Func<TValue, TReturnValue> onSuccess,
        Func<TError, TReturnValue> onFailure)
    {
        return result.IsSuccess
            ? onSuccess(result.Value)
            : onFailure(result.Error);
    }

    public static void Match<TValue, TError>(
       this Result<TValue, TError> result,
       Action<TValue> onSuccess,
       Action<TError> onFailure)
    {
        if (result.IsSuccess)
            onSuccess(result.Value);
        else
            onFailure(result.Error);
    }


    // Asynchronous extensions

    public static async Task<Result<TNewValue, TError>> MapAsync<TValue, TNewValue, TError>(
        this Result<TValue, TError> result,
        Func<TValue, Task<TNewValue>> mapAsync)
    {
        return result.IsSuccess
            ? Result<TNewValue, TError>.Success(await mapAsync(result.Value).ConfigureAwait(false))
            : Result<TNewValue, TError>.Failure(result.Error);
    }

    public static async Task<Result<TNewValue, TError>> MapAsync<TValue, TNewValue, TError>(
        this Task<Result<TValue, TError>> result,
        Func<TValue, TNewValue> map)
    {
        return (await result.ConfigureAwait(false)).Map(map);
    }

    public static async Task<Result<TNewValue, TError>> MapAsync<TValue, TNewValue, TError>(
        this Task<Result<TValue, TError>> result,
        Func<TValue, Task<TNewValue>> mapAsync)
    {
        return await (await result.ConfigureAwait(false))
            .MapAsync(mapAsync)
            .ConfigureAwait(false);
    }

    public static async ValueTask<Result<TNewValue, TError>> MapAsync<TValue, TNewValue, TError>(
        this Result<TValue, TError> result,
        Func<TValue, ValueTask<TNewValue>> mapAsync)
    {
        return result.IsSuccess
            ? Result<TNewValue, TError>.Success(await mapAsync(result.Value).ConfigureAwait(false))
            : Result<TNewValue, TError>.Failure(result.Error);
    }

    public static async ValueTask<Result<TNewValue, TError>> MapAsync<TValue, TNewValue, TError>(
        this ValueTask<Result<TValue, TError>> result,
        Func<TValue, TNewValue> map)
    {
        return (await result.ConfigureAwait(false)).Map(map);
    }

    public static async ValueTask<Result<TNewValue, TError>> MapAsync<TValue, TNewValue, TError>(
        this ValueTask<Result<TValue, TError>> result,
        Func<TValue, ValueTask<TNewValue>> mapAsync)
    {
        return await (await result.ConfigureAwait(false))
            .MapAsync(mapAsync)
            .ConfigureAwait(false);
    }


    public static async Task<Result<TValue, TNewError>> MapErrorAsync<TValue, TError, TNewError>(
        this Result<TValue, TError> result,
        Func<TError, Task<TNewError>> mapErrorAsync)
    {
        return result.IsSuccess
            ? Result<TValue, TNewError>.Success(result.Value)
            : Result<TValue, TNewError>.Failure(await mapErrorAsync(result.Error).ConfigureAwait(false));
    }

    public static async Task<Result<TValue, TNewError>> MapErrorAsync<TValue, TError, TNewError>(
        this Task<Result<TValue, TError>> result,
        Func<TError, TNewError> mapError)
    {
        return (await result.ConfigureAwait(false)).MapError(mapError);
    }

    public static async Task<Result<TValue, TNewError>> MapErrorAsync<TValue, TError, TNewError>(
        this Task<Result<TValue, TError>> result,
        Func<TError, Task<TNewError>> mapErrorAsync)
    {
        return await (await result.ConfigureAwait(false))
            .MapErrorAsync(mapErrorAsync)
            .ConfigureAwait(false);
    }

    public static async ValueTask<Result<TValue, TNewError>> MapErrorAsync<TValue, TError, TNewError>(
        this Result<TValue, TError> result,
        Func<TError, ValueTask<TNewError>> mapErrorAsync)
    {
        return result.IsSuccess
            ? Result<TValue, TNewError>.Success(result.Value)
            : Result<TValue, TNewError>.Failure(await mapErrorAsync(result.Error).ConfigureAwait(false));
    }

    public static async ValueTask<Result<TValue, TNewError>> MapErrorAsync<TValue, TError, TNewError>(
        this ValueTask<Result<TValue, TError>> result,
        Func<TError, TNewError> mapError)
    {
        return (await result.ConfigureAwait(false)).MapError(mapError);
    }

    public static async ValueTask<Result<TValue, TNewError>> MapErrorAsync<TValue, TError, TNewError>(
        this ValueTask<Result<TValue, TError>> result,
        Func<TError, ValueTask<TNewError>> mapErrorAsync)
    {
        return await (await result.ConfigureAwait(false))
            .MapErrorAsync(mapErrorAsync)
            .ConfigureAwait(false);
    }


    public static async Task<Result<TNewValue, TError>> BindAsync<TValue, TNewValue, TError>(
        this Result<TValue, TError> result,
        Func<TValue, Task<Result<TNewValue, TError>>> bindAsync)
    {
        return result.IsSuccess
            ? await bindAsync(result.Value).ConfigureAwait(false)
            : Result<TNewValue, TError>.Failure(result.Error);
    }

    public static async Task<Result<TNewValue, TError>> BindAsync<TValue, TNewValue, TError>(
        this Task<Result<TValue, TError>> result,
        Func<TValue, Result<TNewValue, TError>> bind)
    {
        return (await result.ConfigureAwait(false)).Bind(bind);
    }

    public static async Task<Result<TNewValue, TError>> BindAsync<TValue, TNewValue, TError>(
        this Task<Result<TValue, TError>> result,
        Func<TValue, Task<Result<TNewValue, TError>>> bindAsync)
    {
        return await (await result.ConfigureAwait(false)).BindAsync(bindAsync);
    }

    public static async ValueTask<Result<TNewValue, TError>> BindAsync<TValue, TNewValue, TError>(
        this Result<TValue, TError> result,
        Func<TValue, ValueTask<Result<TNewValue, TError>>> bindAsync)
    {
        return result.IsSuccess
            ? await bindAsync(result.Value).ConfigureAwait(false)
            : Result<TNewValue, TError>.Failure(result.Error);
    }

    public static async ValueTask<Result<TNewValue, TError>> BindAsync<TValue, TNewValue, TError>(
        this ValueTask<Result<TValue, TError>> result,
        Func<TValue, Result<TNewValue, TError>> bind)
    {
        return (await result.ConfigureAwait(false)).Bind(bind);
    }

    public static async ValueTask<Result<TNewValue, TError>> BindAsync<TValue, TNewValue, TError>(
        this ValueTask<Result<TValue, TError>> result,
        Func<TValue, ValueTask<Result<TNewValue, TError>>> bindAsync)
    {
        return await (await result.ConfigureAwait(false))
            .BindAsync(bindAsync)
            .ConfigureAwait(false);
    }


    public static Task<TReturnValue> MatchAsync<TReturnValue, TValue, TError>(
       this Result<TValue, TError> result,
       Func<TValue, Task<TReturnValue>> onSuccess,
       Func<TError, Task<TReturnValue>> onFailure)
    {
        return result.IsSuccess
            ? onSuccess(result.Value)
            : onFailure(result.Error);
    }

    public static async Task<TReturnValue> MatchAsync<TReturnValue, TValue, TError>(
       this Task<Result<TValue, TError>> result,
       Func<TValue, TReturnValue> onSuccess,
       Func<TError, TReturnValue> onFailure)
    {
        return (await result.ConfigureAwait(false)).Match(onSuccess, onFailure);
    }

    public static async Task<TReturnValue> MatchAsync<TReturnValue, TValue, TError>(
       this Task<Result<TValue, TError>> result,
       Func<TValue, Task<TReturnValue>> onSuccess,
       Func<TError, Task<TReturnValue>> onFailure)
    {
        return await (await result.ConfigureAwait(false))
            .MatchAsync(onSuccess, onFailure)
            .ConfigureAwait(false);
    }

    public static async Task<TReturnValue> MatchAsync<TReturnValue, TValue, TError>(
       this Task<Result<TValue, TError>> result,
       Func<TValue, Task<TReturnValue>> onSuccess,
       Func<TError, TReturnValue> onFailure)
    {
        return await (await result.ConfigureAwait(false))
            .MatchAsync(
                onSuccess,
                (error) => Task.FromResult(onFailure(error))
            ).ConfigureAwait(false);
    }

    public static ValueTask<TReturnValue> MatchAsync<TReturnValue, TValue, TError>(
       this Result<TValue, TError> result,
       Func<TValue, ValueTask<TReturnValue>> onSuccess,
       Func<TError, ValueTask<TReturnValue>> onFailure)
    {
        return result.IsSuccess
            ? onSuccess(result.Value)
            : onFailure(result.Error);
    }

    public static async ValueTask<TReturnValue> MatchAsync<TReturnValue, TValue, TError>(
       this ValueTask<Result<TValue, TError>> result,
       Func<TValue, TReturnValue> onSuccess,
       Func<TError, TReturnValue> onFailure)
    {
        return (await result.ConfigureAwait(false)).Match(onSuccess, onFailure);
    }

    public static async ValueTask<TReturnValue> MatchAsync<TReturnValue, TValue, TError>(
       this ValueTask<Result<TValue, TError>> result,
       Func<TValue, ValueTask<TReturnValue>> onSuccess,
       Func<TError, ValueTask<TReturnValue>> onFailure)
    {
        return await (await result.ConfigureAwait(false))
            .MatchAsync(onSuccess, onFailure)
            .ConfigureAwait(false);
    }

    public static async ValueTask<TReturnValue> MatchAsync<TReturnValue, TValue, TError>(
       this ValueTask<Result<TValue, TError>> result,
       Func<TValue, ValueTask<TReturnValue>> onSuccess,
       Func<TError, TReturnValue> onFailure)
    {
        return await (await result.ConfigureAwait(false))
            .MatchAsync(
                onSuccess,
                (error) => ValueTask.FromResult(onFailure(error))
            ).ConfigureAwait(false);
    }
}