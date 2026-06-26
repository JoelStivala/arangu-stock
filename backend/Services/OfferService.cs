using backend.DTOs;
using backend.Mappers;
using backend.Repositories;

namespace backend.Services;

public class OfferService : IOfferService
{
    private readonly IOfferRepository _repository;

    public OfferService(IOfferRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<OfferResponseDto>> GetAllAsync()
    {
        var offers = await _repository.GetAllAsync();
        return offers.Select(o => o.ToResponseDto()).ToList();
    }

    public async Task<OfferResponseDto?> GetByIdAsync(Guid id)
    {
        var offer = await _repository.GetByIdAsync(id);
        return offer?.ToResponseDto();
    }

    public async Task<OfferResponseDto> CreateAsync(CreateOfferDto dto)
    {
        var entity = dto.ToEntity();
        var created = await _repository.CreateAsync(entity);
        return created.ToResponseDto();
    }

    public async Task<OfferResponseDto> UpdateAsync(Guid id, UpdateOfferDto dto)
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
