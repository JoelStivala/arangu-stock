using System.Security.Claims;
using backend.Data;
using backend.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;

    public AuthController(AppDbContext db)
    {
        _db = db;
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<AuthMeResponseDto>> Me()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null)
            return Unauthorized();

        var profile = await _db.Profiles
            .Where(p => p.Id == Guid.Parse(userId))
            .Select(p => new AuthMeResponseDto
            {
                Id = p.Id,
                Email = p.Email,
                Role = p.Role,
            })
            .FirstOrDefaultAsync();

        if (profile is null)
            return NotFound();

        return Ok(profile);
    }
}
