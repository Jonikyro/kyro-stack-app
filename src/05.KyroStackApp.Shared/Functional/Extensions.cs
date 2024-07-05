namespace KyroStackApp.Shared.Functional;

public static class Extensions
{
    public static Maybe<T> Some<T>(T value)
    {
        return Maybe<T>.Some(value);
    }

    public static MaybeNone None => default;
}