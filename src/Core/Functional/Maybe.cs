namespace Shared.Functional;

public readonly struct MaybeNone { }

/// <summary>
/// Represents a type that is holding some value or no value at all.
/// </summary>
public readonly struct Maybe<TValue>
{
    internal readonly bool HasValue;
    internal readonly TValue Value;

    internal Maybe(TValue value)
    {
#nullable disable
        this.Value = value;
        this.HasValue = true;
#nullable enable
    }

    public static Maybe<TValue> Some(TValue value)
    {
#nullable disable
        return Check<TValue>.IsNull(value)
            ? throw new ArgumentNullException(nameof(value))
            : new Maybe<TValue>(value);
#nullable enable
    }

    public static readonly Maybe<TValue> None = default;

    public void IfSome(Action<TValue> func)
    {
#nullable disable
        if (this.HasValue)
            func(this.Value);
#nullable enable
    }

    public void IfNone(Action func)
    {
        if (!this.HasValue) func.Invoke();
    }

    public static explicit operator TValue(Maybe<TValue> maybeValue)
    {
#nullable disable
        return maybeValue.HasValue
            ? maybeValue.Value
            : throw new ArgumentNullException(nameof(maybeValue));
#nullable enable
    }

    public static implicit operator Maybe<TValue>(TValue? value)
    {
#nullable disable
        return value is null
            ? None
            : new Maybe<TValue>(value);
#nullable enable
    }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Style", "IDE0060:Remove unused parameter", Justification = "Value not needed")]
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
        return maybeValue.HasValue;
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
        return !maybeValue.HasValue;
    }
}
