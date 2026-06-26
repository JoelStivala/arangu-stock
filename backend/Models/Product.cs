using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Product
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public float Price { get; set; }

    public int Stock { get; set; }

    public string? ImageUrl { get; set; }

    public Guid CategoryId { get; set; }

    public Guid? OfferId { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual Offer? Offer { get; set; }
}
