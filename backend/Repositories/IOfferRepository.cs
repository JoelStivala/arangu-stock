using backend.Models;

namespace backend.Repositories;

public interface IOfferRepository
{
    Task<List<Offer>> GetAllAsync();
    Task<Offer?> GetByIdAsync(Guid id);
    Task<Offer> CreateAsync(Offer offer);
    Task<Offer> UpdateAsync(Offer offer);
    Task DeleteAsync(Guid id);
}
