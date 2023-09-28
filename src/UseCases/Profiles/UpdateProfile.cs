namespace UseCases.Profiles;
internal class UpdateProfileCommandHandler
{
    private readonly GetProfileQueryHandler getProfileQueryHandler;
    private readonly IUnitOfWork _uow;

    public UpdateProfileCommandHandler(
        GetProfileQueryHandler getProfileQueryHandler,
        IUnitOfWork uow)
    {
        this.getProfileQueryHandler = getProfileQueryHandler;
        this._uow = uow;
    }

    public async Task<UserProfile> HandleCommand()
    {
        await using var tx = await _uow.BeginTransactionAsync();

        await tx.CommitAsync();

        throw new NotImplementedException();
    }
}
