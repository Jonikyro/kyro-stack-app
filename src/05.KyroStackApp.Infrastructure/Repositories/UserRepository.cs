using KyroStackApp.Domain.User;

namespace KyroStackApp.Infrastructure.Repositories;

internal sealed class UserRepository : IUserRepository
{
    private readonly AppDbContext _appDbContext;

    public UserRepository(AppDbContext appDbContext)
    {
        this._appDbContext = appDbContext;
    }

    public async Task AddAsync(User user)
    {
        await this._appDbContext.AddAsync(user);
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await this._appDbContext.FindAsync<User>(id);
    }
}
