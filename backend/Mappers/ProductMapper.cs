using backend.DTOs;
using backend.Models;

namespace backend.Mappers;

public static class ProductMapper
{
    public static ProductResponseDto ToResponseDto(this Product product)
    {
        return new ProductResponseDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            Stock = product.Stock,
            ImageUrl = product.ImageUrl,
            CategoryId = product.CategoryId,
            CategoryName = product.Category?.Name,
            OfferId = product.OfferId,
            OfferName = product.Offer?.Name,
            DiscountPercentage = product.Offer?.DiscountPercentage,
            IsActive = product.IsActive,
            CreatedAt = product.CreatedAt,
            UpdatedAt = product.UpdatedAt
        };
    }

    public static Product ToEntity(this CreateProductDto dto)
    {
        return new Product
        {
            Id = Guid.Empty,
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Stock = dto.Stock,
            ImageUrl = dto.ImageUrl,
            CategoryId = dto.CategoryId,
            OfferId = dto.OfferId,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
    }

    public static Product ToEntity(this UpdateProductDto dto, Guid id)
    {
        return new Product
        {
            Id = id,
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Stock = dto.Stock,
            ImageUrl = dto.ImageUrl,
            CategoryId = dto.CategoryId,
            OfferId = dto.OfferId,
            IsActive = dto.IsActive
        };
    }
}
