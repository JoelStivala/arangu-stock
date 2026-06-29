namespace backend.Services;

public interface IIAService
{
    Task<string> GenerateDescriptionAsync(string name, string category);
}
