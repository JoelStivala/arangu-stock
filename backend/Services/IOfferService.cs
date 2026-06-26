using backend.DTOs;

namespace backend.Services;

public interface IOfferService
{
    Task<List<OfferResponseDto>> GetAllAsync();
    Task<OfferResponseDto?> GetByIdAsync(Guid id);
    Task<OfferResponseDto> CreateAsync(CreateOfferDto dto);
    Task<OfferResponseDto> UpdateAsync(Guid id, UpdateOfferDto dto);
    Task DeleteAsync(Guid id);
}
