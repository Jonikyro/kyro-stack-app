namespace KyroStackApp.Shared.Functional;

public readonly struct MaybeNone { }

/// <summary>
/// Represents a type that is holding some value or no value at all.
/// </summary>
public readonly struct Maybe<TValue>
{
    internal readonly bool _hasValue;
    internal readonly TValue _value;

    internal Maybe(TValue value)
    {
        this._value = value;
        this._hasValue = true;
    }

    public static Maybe<TValue> Some(TValue value)
    {
        return Check<TValue>.IsNull(value)
            ? throw new ArgumentNullException(nameof(value))
            : new Maybe<TValue>(value);
    }

    public static readonly Maybe<TValue> None = default;

    public void IfSome(Action<TValue> func)
    {
        if (this._hasValue)
            func(this._value);
    }

    public void IfNone(Action func)
    {
        if (!this._hasValue) func.Invoke();
    }

    public static explicit operator TValue(Maybe<TValue> maybeValue)
    {

        return maybeValue._hasValue
            ? maybeValue._value
            : throw new ArgumentNullException(nameof(maybeValue));

    }

    public static implicit operator Maybe<TValue>(TValue? value)
    {
        return value is null
            ? None
            : new Maybe<TValue>(value);
    }

    public static implicit operator Maybe<TValue>(MaybeNone none)
    {
        return default;
    }

    /// <summary>
    /// Implicilty casts the value as boolean.
    /// </summary>
    /// <example>
    /// <code>
    /// Maybe<int> number = Some(1)
    /// if (number)
    /// ...
    /// </code>
    /// </example>
    public static bool operator true(Maybe<TValue> maybeValue)
    {
        return maybeValue._hasValue;
    }

    /// <summary>
    /// Implicilty casts the value as boolean.
    /// </summary>
    /// <example>
    /// <code>
    /// Maybe<int> number = None;
    /// if (!number)
    /// ...
    /// </code>
    /// </example>
    public static bool operator false(Maybe<TValue> maybeValue)
    {
        return !maybeValue._hasValue;
    }
}
