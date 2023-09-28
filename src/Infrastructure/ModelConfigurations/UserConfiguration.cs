using Domain.User;

namespace Infrastructure.ModelConfigurations;

internal sealed class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        ConfigureUserEntity(builder);
        ConfigureProfileEntity(builder);
    }

    private static void ConfigureUserEntity(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);

        builder.Property(u => u.Id)
            .HasMaxLength(26)
            .ValueGeneratedNever()
            .HasConversion(
                id => id.ToString(),
                value => UID.CreateFrom(value)
            );

        builder.OwnsOne(u => u.Name, nb =>
        {
            nb.Property(n => n.FirstNames).HasMaxLength(50);
            nb.Property(n => n.Lastname).HasMaxLength(50);
        });
    }

    private static void ConfigureProfileEntity(EntityTypeBuilder<User> builder)
    {
        builder.OwnsOne(u => u.Profile, pb =>
        {
            pb.ToTable(nameof(Profile));

            pb.HasKey(u => u.Id);

            pb.Property(p => p.Id)
                .HasMaxLength(26)
                .ValueGeneratedNever()
                .HasConversion(
                    id => id.ToString(),
                    value => UID.CreateFrom(value)
                );

            pb.WithOwner().HasForeignKey("UserId");

            pb.OwnsOne(p => p.Address, ab =>
            {
                ab.Property(a => a.Street).HasMaxLength(50);
                ab.Property(a => a.City).HasMaxLength(50);
                ab.Property(a => a.ZipCode).HasMaxLength(20);
            });

            pb.OwnsOne(p => p.Email, eb =>
            {
                eb.Property(e => e.EmailAddress)
                    .HasMaxLength(50)
                    .HasColumnName("Email");

                eb.HasIndex(e => e.EmailAddress).IsUnique();
            });
        });
    }
}
