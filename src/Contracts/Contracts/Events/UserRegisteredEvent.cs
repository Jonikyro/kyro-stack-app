using Shared;

namespace Contracts.Events;
public record UserRegisteredEvent(UID Id, string Firstname, string Lastname, string Email);
