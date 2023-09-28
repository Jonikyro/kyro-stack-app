namespace Domain;

public abstract class ValueObject : IEquatable<ValueObject>
{
    private int? _cachedHashCode;

    public abstract IEnumerable<object> GetEqualityComponents();

    public override bool Equals(object? obj)
    {
        if (obj is null || obj.GetType() != this.GetType() || obj is not ValueObject valueObj)
            return false;

        return this.GetEqualityComponents().SequenceEqual(valueObj.GetEqualityComponents());
    }

    public override int GetHashCode()
    {
        if (this._cachedHashCode.HasValue) return this._cachedHashCode.Value;

        this._cachedHashCode = this.GetEqualityComponents()
            .Aggregate(1, (current, obj) =>
            {
                unchecked
                {
                    return (current * 23) + (obj?.GetHashCode() ?? 0);
                }
            });

        return this._cachedHashCode.Value;
    }

    public bool Equals(ValueObject? valueObj)
    {
        if (valueObj is null || valueObj.GetType() != this.GetType()) return false;

        return this.GetEqualityComponents().SequenceEqual(valueObj.GetEqualityComponents());
    }
}