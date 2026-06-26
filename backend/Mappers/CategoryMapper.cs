using backend.DTOs;
using backend.Models;

namespace backend.Mappers;

public static class CategoryMapper
{
    public static CategoryResponseDto ToResponseDto(this Category category)
    {
        return new CategoryResponseDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            CreatedAt = category.CreatedAt
        };
    }

    public static Category ToEntity(this CreateCategoryDto dto)
    {
        return new Category
        {
            Id = Guid.Empty,
            Name = dto.Name,
            Description = dto.Description,
            CreatedAt = DateTime.UtcNow
        };
    }

    public static Category ToEntity(this UpdateCategoryDto dto, Guid id)
    {
        return new Category
        {
            Id = id,
            Name = dto.Name,
            Description = dto.Description
        };
    }
}
