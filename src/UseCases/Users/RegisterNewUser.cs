using Domain.User;

namespace UseCases.Users;

public sealed class RegisterNewUserCommand : ICommand
{
    public required string Firstnames { get; init; }
    public required string Lastname { get; init; }
    public required string Email { get; init; }
    public required string City { get; init; }
}

internal sealed class RegisterNewUserCommandHandler : ICommandHandler<RegisterNewUserCommand>
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _uow;

    public RegisterNewUserCommandHandler(IUserRepository userRepository, IUnitOfWork uow)
    {
        this._userRepository = userRepository;
        this._uow = uow;
    }

    public async Task HandleAsync(RegisterNewUserCommand command, CancellationToken cancellationToken = default)
    {
        User newUser = User.Create(
            PersonName.Create(command.Firstnames, command.Lastname),
            Profile.Create(
                Address.Create(command.City, "unknown", "unknown"),
                Email.Create(command.Email)));

        await this._userRepository.AddUser(newUser);
        await this._uow.SaveChangesAsync(cancellationToken);
    }
}
