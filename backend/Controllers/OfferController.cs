using System.Security.Claims;
using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OfferController : ControllerBase
{
    private readonly IOfferService _service;
    private readonly IRoleService _roleService;

    public OfferController(IOfferService service, IRoleService roleService)
    {
        _service = service;
        _roleService = roleService;
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

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<OfferResponseDto>> Create(CreateOfferDto dto)
    {
        if (!await IsAdmin()) return Forbid();
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<OfferResponseDto>> Update(Guid id, UpdateOfferDto dto)
    {
        if (!await IsAdmin()) return Forbid();
        var existing = await _service.GetByIdAsync(id);
        if (existing is null)
            return NotFound();

        var updated = await _service.UpdateAsync(id, dto);
        return Ok(updated);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        if (!await IsAdmin()) return Forbid();
        var existing = await _service.GetByIdAsync(id);
        if (existing is null)
            return NotFound();

        await _service.DeleteAsync(id);
        return NoContent();
    }

    private async Task<bool> IsAdmin()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null) return false;
        var role = await _roleService.GetRoleAsync(Guid.Parse(userId));
        return role == "admin";
    }
}
