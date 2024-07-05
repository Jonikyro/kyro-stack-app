namespace KyroStackApp.Domain.User;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(UId id);

    Task AddAsync(User user);
}
