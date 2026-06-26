namespace backend.DTOs;

public class UpdateProductDto
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string? ImageUrl { get; set; }
    public Guid CategoryId { get; set; }
    public Guid? OfferId { get; set; }
    public bool IsActive { get; set; }
}
