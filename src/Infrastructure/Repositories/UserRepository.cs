using Domain.User;

namespace Infrastructure.Repositories;
internal sealed class UserRepository : IUserRepository
{
    private readonly AppDbContext _dbContext;

    public UserRepository(AppDbContext dbContext)
    {
        this._dbContext = dbContext;
    }

    public async Task AddUser(User newUser)
    {
        await this._dbContext.AddAsync(newUser).ConfigureAwait(false);
    }
}
