namespace Domain.ValueObjects;

public sealed class PersonName : ValueObject
{
    public string FirstNames { get; private set; }

    public string Lastname { get; private set; }

    private PersonName(string firstNames, string lastname)
    {
        this.FirstNames = firstNames;
        this.Lastname = lastname;
    }

    public static PersonName Create(string firstNames, string lastname)
    {
        return new PersonName(
            Guard.Against.NullOrWhiteSpace(firstNames),
            Guard.Against.NullOrWhiteSpace(lastname));
    }

    public override string ToString()
    {
        return $"{this.FirstNames} {this.Lastname}";
    }

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return this.FirstNames;
        yield return this.Lastname;
    }
}
