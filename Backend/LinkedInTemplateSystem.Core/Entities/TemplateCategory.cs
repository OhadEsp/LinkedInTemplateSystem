using System.ComponentModel.DataAnnotations;

namespace LinkedInTemplateSystem.Core.Entities;

public class TemplateCategory
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [StringLength(500)]
    public string? Description { get; set; }
    
    [StringLength(7)]
    public string Color { get; set; } = "#0077B5"; // LinkedIn blue by default
    
    public string Icon { get; set; } = "💼"; // Default icon
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public bool IsActive { get; set; } = true;
    
    // Navigation property
    public ICollection<MessageTemplate> Templates { get; set; } = new List<MessageTemplate>();
}
