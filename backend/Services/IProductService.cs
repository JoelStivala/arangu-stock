using backend.DTOs;

namespace backend.Services;

public interface IProductService
{
    Task<List<ProductResponseDto>> GetAllAsync(string? search = null);
    Task<List<ProductResponseDto>> GetAllAdminAsync();
    Task<ProductResponseDto?> GetByIdAsync(Guid id);
    Task<ProductResponseDto> CreateAsync(CreateProductDto dto);
    Task<ProductResponseDto> UpdateAsync(Guid id, UpdateProductDto dto);
    Task DeleteAsync(Guid id);
    Task ActivateAsync(Guid id);
}
