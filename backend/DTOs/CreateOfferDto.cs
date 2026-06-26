namespace backend.DTOs;

public class CreateOfferDto
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public short DiscountPercentage { get; set; }
    public bool Active { get; set; } = true;
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
}
