using backend.DTOs;
using backend.Mappers;
using backend.Repositories;

namespace backend.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _repository;

    public CategoryService(ICategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<CategoryResponseDto>> GetAllAsync()
    {
        var categories = await _repository.GetAllAsync();
        return categories.Select(c => c.ToResponseDto()).ToList();
    }

    public async Task<CategoryResponseDto?> GetByIdAsync(Guid id)
    {
        var category = await _repository.GetByIdAsync(id);
        return category?.ToResponseDto();
    }

    public async Task<CategoryResponseDto> CreateAsync(CreateCategoryDto dto)
    {
        var entity = dto.ToEntity();
        var created = await _repository.CreateAsync(entity);
        return created.ToResponseDto();
    }

    public async Task<CategoryResponseDto> UpdateAsync(Guid id, UpdateCategoryDto dto)
    {
        var entity = dto.ToEntity(id);
        var updated = await _repository.UpdateAsync(entity);
        return updated.ToResponseDto();
    }

    public async Task DeleteAsync(Guid id)
    {
        await _repository.DeleteAsync(id);
    }
}
