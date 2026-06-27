using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class RoleService : IRoleService
{
    private readonly AppDbContext _db;

    public RoleService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<string?> GetRoleAsync(Guid userId)
    {
        var profile = await _db.Profiles
            .Where(p => p.Id == userId)
            .Select(p => p.Role)
            .FirstOrDefaultAsync();

        return profile;
    }
}
