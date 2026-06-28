using backend.DTOs;
using backend.Mappers;
using backend.Repositories;

namespace backend.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ProductResponseDto>> GetAllAsync(string? search = null)
    {
        var products = await _repository.GetAllAsync(search);
        return products.Select(p => p.ToResponseDto()).ToList();
    }

    public async Task<List<ProductResponseDto>> GetAllAdminAsync()
    {
        var products = await _repository.GetAllAdminAsync();
        return products.Select(p => p.ToResponseDto()).ToList();
    }

    public async Task<ProductResponseDto?> GetByIdAsync(Guid id)
    {
        var product = await _repository.GetByIdAsync(id);
        return product?.ToResponseDto();
    }

    public async Task<ProductResponseDto> CreateAsync(CreateProductDto dto)
    {
        var entity = dto.ToEntity();
        var created = await _repository.CreateAsync(entity);
        return created.ToResponseDto();
    }

    public async Task<ProductResponseDto> UpdateAsync(Guid id, UpdateProductDto dto)
    {
        var entity = dto.ToEntity(id);
        var updated = await _repository.UpdateAsync(entity);
        return updated.ToResponseDto();
    }

    public async Task DeleteAsync(Guid id)
    {
        await _repository.DeleteAsync(id);
    }

    public async Task ActivateAsync(Guid id)
    {
        await _repository.ActivateAsync(id);
    }
}
