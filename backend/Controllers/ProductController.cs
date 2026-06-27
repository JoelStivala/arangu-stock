using System.Security.Claims;
using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _service;
    private readonly IRoleService _roleService;

    public ProductController(IProductService service, IRoleService roleService)
    {
        _service = service;
        _roleService = roleService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductResponseDto>>> GetAll()
    {
        var products = await _service.GetAllAsync();
        return Ok(products);
    }

    [Authorize]
    [HttpGet("admin")]
    public async Task<ActionResult<List<ProductResponseDto>>> GetAllAdmin()
    {
        if (!await IsAdminOrEmployee()) return Forbid();
        var products = await _service.GetAllAdminAsync();
        return Ok(products);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductResponseDto>> GetById(Guid id)
    {
        var product = await _service.GetByIdAsync(id);
        if (product is null)
            return NotFound();
        return Ok(product);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ProductResponseDto>> Create(CreateProductDto dto)
    {
        if (!await IsAdminOrEmployee()) return Forbid();
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ProductResponseDto>> Update(Guid id, UpdateProductDto dto)
    {
        if (!await IsAdminOrEmployee()) return Forbid();
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
        if (!await IsAdminOrEmployee()) return Forbid();
        var existing = await _service.GetByIdAsync(id);
        if (existing is null)
            return NotFound();

        await _service.DeleteAsync(id);
        return NoContent();
    }

    [Authorize]
    [HttpPatch("{id:guid}/activate")]
    public async Task<ActionResult> Activate(Guid id)
    {
        if (!await IsAdminOrEmployee()) return Forbid();
        try
        {
            await _service.ActivateAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    private async Task<bool> IsAdminOrEmployee()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null) return false;
        var role = await _roleService.GetRoleAsync(Guid.Parse(userId));
        return role is "admin" or "employee";
    }
}
