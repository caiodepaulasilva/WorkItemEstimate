namespace Domain.Aggregates
{
    public class Participant
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string RoomId { get; set; }
        public Room Room { get; set; }
    }
}