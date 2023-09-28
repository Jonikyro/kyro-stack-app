using System.Reflection;
using System.Runtime.CompilerServices;

namespace Shared.Functional;

internal static class Check<TValue>
{
    private static readonly bool IsReferenceType;
    private static readonly bool IsNullable;

    static Check()
    {
        IsNullable = Nullable.GetUnderlyingType(typeof(TValue)) != null;
        IsReferenceType = !typeof(TValue).GetTypeInfo().IsValueType;
    }

    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    internal static bool IsNull(TValue value)
    {
        return (IsReferenceType && value is null) || (IsNullable && value!.Equals(default));
    }
}
