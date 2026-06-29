using Google.GenAI;

namespace backend.Services;

public class IAService : IIAService
{
    private readonly Client _client;

    public IAService()
    {
        var apiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY")
            ?? throw new InvalidOperationException("GEMINI_API_KEY no está definida");
        _client = new Client(apiKey: apiKey);
    }

    public async Task<string> GenerateDescriptionAsync(string name, string category)
    {
        var prompt = $@"Genera una descripción comercial para un producto de inventario.

Nombre: {name}
Categoría: {category}

Reglas:
- máximo 80 palabras.
- tono profesional.
- no inventar especificaciones técnicas.
- escribir en español.
- evitar listas y viñetas.";

        var response = await _client.Models.GenerateContentAsync(
            "gemini-2.5-flash",
            prompt
        );

        var text = response.Candidates?
            .FirstOrDefault()?
            .Content?
            .Parts?
            .FirstOrDefault()?
            .Text;

        return text?.Trim() ?? throw new InvalidOperationException("No se pudo generar la descripción");
    }
}
