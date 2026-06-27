using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public partial class Profile
{
    public Guid Id { get; set; }

    [Required]
    [StringLength(255)]
    public string Email { get; set; } = null!;

    [StringLength(50)]
    public string? Role { get; set; }

    public DateTime CreatedAt { get; set; }
}
