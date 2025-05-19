namespace Domain.Common.Models
{
    public abstract class Entity
    {
        public string Id { get; protected set; } = Guid.NewGuid().ToString();
    }
}