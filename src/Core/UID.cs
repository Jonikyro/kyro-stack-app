using NUlid;
using System.Runtime.Serialization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Shared;

/// <summary>
/// Unique identifier.
/// </summary>
[Serializable]
[JsonConverter(typeof(UIDConverter))]
public readonly struct UID : IEquatable<UID>, IComparable<UID>, IComparable, ISerializable
{
    private readonly Ulid Value;

    private UID(Ulid ulid)
    {
        this.Value = ulid;
    }

    public DateTimeOffset CreatedAt()
    {
        return this.Value.Time;
    }

    public ReadOnlySpan<byte> ToByteArray()
    {
        return this.Value.ToByteArray();
    }

    public static UID Create()
    {
        return new UID(Ulid.NewUlid());
    }

    public static UID CreateFrom(string ulid)
    {
        return new UID(new Ulid(ulid));
    }

    public static UID CreateFrom(byte[] bytes)
    {
        return new UID(new Ulid(bytes));
    }

    public override string ToString()
    {
        return this.Value.ToString();
    }

    public override int GetHashCode()
    {
        ReadOnlySpan<byte> array = this.Value.ToByteArray();

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
        return this.Value.Equals(obj);
    }

    public static implicit operator UID(string value)
    {
        return UID.CreateFrom(value);
    }

    public static implicit operator string(UID value)
    {
        return value.ToString();
    }

    public static bool operator ==(UID x, UID y)
    {
        ReadOnlySpan<byte> array = x.Value.ToByteArray();
        ReadOnlySpan<byte> array2 = y.Value.ToByteArray();

        for (int i = 0; i < 16; i++)
        {
            if (array[i] != array2[i])
            {
                return false;
            }
        }

        return true;
    }

    public static bool operator !=(UID x, UID y)
    {
        return !(x == y);
    }

    public bool Equals(UID other)
    {
        return this.Value.Equals(other.Value);
    }

    public int CompareTo(UID other)
    {
        return this.Value.CompareTo(other.Value);
    }

    public int CompareTo(object? obj)
    {
        if (obj is null) return 1;
        return this.Value.CompareTo(obj);
    }

    public void GetObjectData(SerializationInfo info, StreamingContext context)
    {
        this.Value.GetObjectData(info, context);
    }
}

public class UIDConverter : JsonConverter<UID>
{
    public override UID Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
            => UID.CreateFrom(reader.GetString()!);


    public override void Write(
        Utf8JsonWriter writer,
        UID value,
        JsonSerializerOptions options)
            => writer.WriteStringValue(value);
}