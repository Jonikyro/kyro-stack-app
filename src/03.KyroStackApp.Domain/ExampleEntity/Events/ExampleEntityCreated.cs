namespace KyroStackApp.Domain.ExampleEntity.Events;

public class ExampleEntityCreated : DomainEvent
{
    internal ExampleEntityCreated(ExampleEntity exampleEntity)
    {
        this.ExampleEntity = exampleEntity;
    }

    public ExampleEntity ExampleEntity { get; }
}
