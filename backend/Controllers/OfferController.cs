using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OfferController : ControllerBase
{
    private readonly IOfferService _service;

    public OfferController(IOfferService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<OfferResponseDto>>> GetAll()
    {
        var offers = await _service.GetAllAsync();
        return Ok(offers);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<OfferResponseDto>> GetById(Guid id)
    {
        var offer = await _service.GetByIdAsync(id);
        if (offer is null)
            return NotFound();
        return Ok(offer);
    }

    [HttpPost]
    public async Task<ActionResult<OfferResponseDto>> Create(CreateOfferDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<OfferResponseDto>> Update(Guid id, UpdateOfferDto dto)
    {
        var existing = await _service.GetByIdAsync(id);
        if (existing is null)
            return NotFound();

        var updated = await _service.UpdateAsync(id, dto);
        return Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var existing = await _service.GetByIdAsync(id);
        if (existing is null)
            return NotFound();

        await _service.DeleteAsync(id);
        return NoContent();
    }
}
