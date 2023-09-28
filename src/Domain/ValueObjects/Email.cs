using Domain.Exceptions;
using System.Text.RegularExpressions;

namespace Domain.ValueObjects;
public partial class Email : ValueObject
{
    public string EmailAddress { get; private set; }

    private Email(string emailAddress)
    {
        this.EmailAddress = emailAddress;
    }

    public static Email Create(string emailAddress)
    {
        string nonEmptyEmail = Guard.Against.NullOrWhiteSpace(emailAddress);

        if (EmailRegex().IsMatch(nonEmptyEmail))
        {
            return new Email(emailAddress);
        }

        throw new InvalidEmailException(emailAddress);
    }

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return this.EmailAddress;
    }

    /// <summary>
    /// Code generated email validation regex.
    /// </summary>
    [GeneratedRegex("^\\S+@\\S+\\.\\S+$")]
    private static partial Regex EmailRegex();
}
