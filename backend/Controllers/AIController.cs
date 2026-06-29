using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/ai")]
public class AIController : ControllerBase
{
    private readonly IIAService _service;

    public AIController(IIAService service)
    {
        _service = service;
    }

    [HttpPost("description")]
    public async Task<ActionResult<GenerateDescriptionResponse>> GenerateDescription(GenerateDescriptionRequest request)
    {
        try
        {
            var description = await _service.GenerateDescriptionAsync(request.Name, request.Category);
            return Ok(new GenerateDescriptionResponse { Description = description });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Ocurrió un error al generar la descripción. Intentalo de nuevo más tarde." });
        }
    }
}
