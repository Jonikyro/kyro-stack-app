namespace Domain.ValueObjects;

public sealed class Address : ValueObject
{
    public string City { get; private set; }
    public string Street { get; private set; }
    public string ZipCode { get; private set; }

    private Address(string city, string street, string zipCode)
    {
        this.City = city;
        this.Street = street;
        this.ZipCode = zipCode;
    }

    public static Address Create(string city, string street, string zipCode)
    {
        return new Address(
            Guard.Against.NullOrWhiteSpace(city),
            Guard.Against.NullOrWhiteSpace(street),
            Guard.Against.NullOrWhiteSpace(zipCode));
    }

    public override string ToString()
    {
        return string.Format("{0} {1} {2}", this.Street, this.City, this.ZipCode);
    }

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return this.ZipCode;
        yield return this.City;
        yield return this.Street;
    }
}
