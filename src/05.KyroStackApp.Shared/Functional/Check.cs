using System.Reflection;
using System.Runtime.CompilerServices;

namespace KyroStackApp.Shared.Functional;

internal static class Check<TValue>
{
#pragma warning disable S2743 // Static fields should not be used in generic types
    private static readonly bool s_isReferenceType;
    private static readonly bool s_isNullable;
#pragma warning restore S2743 // Static fields should not be used in generic types

#pragma warning disable S3963 // "static" fields should be initialized inline
    static Check()
#pragma warning restore S3963 // "static" fields should be initialized inline
    {
        s_isNullable = Nullable.GetUnderlyingType(typeof(TValue)) != null;
        s_isReferenceType = !typeof(TValue).GetTypeInfo().IsValueType;
    }

    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    internal static bool IsNull(TValue value)
    {
        return (s_isReferenceType && value is null) || (s_isNullable && value!.Equals(default));
    }
}
