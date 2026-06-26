using backend.DTOs;
using backend.Models;

namespace backend.Mappers;

public static class OfferMapper
{
    public static OfferResponseDto ToResponseDto(this Offer offer)
    {
        return new OfferResponseDto
        {
            Id = offer.Id,
            Name = offer.Name,
            Description = offer.Description,
            DiscountPercentage = offer.DiscountPercentage,
            Active = offer.Active,
            StartDate = offer.StartDate,
            EndDate = offer.EndDate,
            CreatedAt = offer.CreatedAt
        };
    }

    public static Offer ToEntity(this CreateOfferDto dto)
    {
        return new Offer
        {
            Id = Guid.Empty,
            Name = dto.Name,
            Description = dto.Description,
            DiscountPercentage = dto.DiscountPercentage,
            Active = dto.Active,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            CreatedAt = DateTime.UtcNow
        };
    }

    public static Offer ToEntity(this UpdateOfferDto dto, Guid id)
    {
        return new Offer
        {
            Id = id,
            Name = dto.Name,
            Description = dto.Description,
            DiscountPercentage = dto.DiscountPercentage,
            Active = dto.Active,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate
        };
    }
}
