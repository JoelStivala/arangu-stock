namespace backend.Services;

public interface IRoleService
{
    Task<string?> GetRoleAsync(Guid userId);
}
