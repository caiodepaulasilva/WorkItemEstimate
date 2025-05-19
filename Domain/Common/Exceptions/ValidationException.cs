namespace Domain.Common.Exceptions
{
    public class ValidationException(Dictionary<string, string[]> errors) : DomainException("Erros de validação ocorreram")
    {
        public Dictionary<string, string[]> Errors { get; } = errors;
    }
}