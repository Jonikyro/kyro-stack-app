namespace Domain.Exceptions;
public sealed class InvalidEmailException : Exception
{
    internal InvalidEmailException(string invalidEmail)
        : base($"Invalid email: {invalidEmail}")
    {

    }
}
