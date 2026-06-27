namespace backend.DTOs;

public class AuthMeResponseDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = null!;
    public string? Role { get; set; }
}
