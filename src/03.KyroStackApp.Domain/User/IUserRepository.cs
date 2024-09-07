namespace KyroStackApp.Domain.User;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(int id);

    Task AddAsync(User user);
}
