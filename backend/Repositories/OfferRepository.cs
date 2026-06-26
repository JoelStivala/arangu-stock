using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class OfferRepository : IOfferRepository
{
    private readonly AppDbContext _context;

    public OfferRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Offer>> GetAllAsync()
    {
        return await _context.Offers.OrderBy(o => o.Name).ToListAsync();
    }

    public async Task<Offer?> GetByIdAsync(Guid id)
    {
        return await _context.Offers.FindAsync(id);
    }

    public async Task<Offer> CreateAsync(Offer offer)
    {
        offer.Id = Guid.Empty;
        _context.Offers.Add(offer);
        await _context.SaveChangesAsync();
        return offer;
    }

    public async Task<Offer> UpdateAsync(Offer offer)
    {
        var existing = await _context.Offers.FindAsync(offer.Id)
            ?? throw new KeyNotFoundException($"Offer with Id {offer.Id} not found.");

        _context.Entry(existing).CurrentValues.SetValues(offer);
        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task DeleteAsync(Guid id)
    {
        var offer = await _context.Offers.FindAsync(id);
        if (offer is not null)
        {
            _context.Offers.Remove(offer);
            await _context.SaveChangesAsync();
        }
    }
}
