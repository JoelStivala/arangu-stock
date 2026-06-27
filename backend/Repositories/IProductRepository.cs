using backend.Models;

namespace backend.Repositories;

public interface IProductRepository
{
    Task<List<Product>> GetAllAsync();
    Task<List<Product>> GetAllAdminAsync();
    Task<Product?> GetByIdAsync(Guid id);
    Task<Product?> GetByIdIncludingInactiveAsync(Guid id);
    Task<Product> CreateAsync(Product product);
    Task<Product> UpdateAsync(Product product);
    Task DeleteAsync(Guid id);
    Task ActivateAsync(Guid id);
}
