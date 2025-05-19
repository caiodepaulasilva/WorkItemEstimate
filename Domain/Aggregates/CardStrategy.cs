namespace Domain.Aggregates
{
    public class CardStrategy(string id, string name, List<string> cards)
    {
        public string Id { get; } = id;
        public string Name { get; } = name;
        public List<string> Cards { get; } = cards;
    }
}