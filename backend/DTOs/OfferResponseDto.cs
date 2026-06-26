namespace backend.DTOs;

public class OfferResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public short DiscountPercentage { get; set; }
    public bool Active { get; set; }
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public DateTime CreatedAt { get; set; }
}
