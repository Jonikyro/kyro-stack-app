namespace Domain.User;
public interface IUserRepository
{
    Task AddUser(User newUser);
}
