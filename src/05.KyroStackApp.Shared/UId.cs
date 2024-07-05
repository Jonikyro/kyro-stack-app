using NUlid;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace KyroStackApp.Shared;

/// <summary>
/// Unique identifier.
/// </summary>
[JsonConverter(typeof(IdConverter))]
public readonly struct UId : IEquatable<UId>, IComparable<UId>, IComparable
{
    private readonly Ulid _value;

    private UId(Ulid ulid)
    {
        this._value = ulid;
    }

    public DateTimeOffset CreatedAt()
    {
        return this._value.Time;
    }

    public ReadOnlySpan<byte> ToByteArray()
    {
        return this._value.ToByteArray();
    }

    public static UId Create()
    {
        return new UId(Ulid.NewUlid());
    }

    public static UId CreateFrom(string ulid)
    {
        return new UId(new Ulid(ulid));
    }

    public static UId CreateFrom(byte[] bytes)
    {
        return new UId(new Ulid(bytes));
    }

    public override string ToString()
    {
        return this._value.ToString();
    }

    public override int GetHashCode()
    {
        ReadOnlySpan<byte> array = this._value.ToByteArray();

        int num = -2128831035;
        for (int i = 0; i < 16; i++)
        {
            num = (num * 16777619) ^ array[i];
        }

        return num;
    }

    public override bool Equals(object? obj)
    {
        if (obj is null) return false;
        return this._value.Equals(obj);
    }

    public bool Equals(UId other)
    {
        return this._value.Equals(other._value);
    }

    public static bool operator ==(UId x, UId y)
    {
        return x._value == y._value;
    }

    public static bool operator !=(UId x, UId y)
    {
        return !(x == y);
    }

    public static bool operator >(UId x, UId y)
    {
        return x._value > y._value;
    }

    public static bool operator >=(UId x, UId y)
    {
        return x._value >= y._value;
    }

    public static bool operator <(UId x, UId y)
    {
        return x._value < y._value;
    }

    public static bool operator <=(UId x, UId y)
    {
        return x._value <= y._value;
    }

    public static implicit operator UId(string value)
    {
        return UId.CreateFrom(value);
    }

    public static implicit operator string(UId value)
    {
        return value.ToString();
    }

    public int CompareTo(UId other)
    {
        return this._value.CompareTo(other._value);
    }

    public int CompareTo(object? obj)
    {
        if (obj is null) return 1;
        return this._value.CompareTo(obj);
    }
}

public class IdConverter : JsonConverter<UId>
{
    public override UId Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        return UId.CreateFrom(reader.GetString()!);
    }

    public override void Write(
        Utf8JsonWriter writer,
        UId value,
        JsonSerializerOptions options)
    {
        writer.WriteStringValue(value);
    }
}