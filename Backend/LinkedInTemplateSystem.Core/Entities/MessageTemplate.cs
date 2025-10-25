using System.ComponentModel.DataAnnotations;

namespace LinkedInTemplateSystem.Core.Entities;

public class MessageTemplate
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    public string Content { get; set; } = string.Empty;
    
    [StringLength(500)]
    public string? Description { get; set; }
    
    public int CategoryId { get; set; }
    public TemplateCategory Category { get; set; } = null!;
    
    public bool IsFavorite { get; set; }
    
    public int UsageCount { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    [StringLength(50)]
    public string? Tags { get; set; } // Comma-separated tags
    
    public bool IsAIGenerated { get; set; }
    
    [StringLength(100)]
    public string? AIPrompt { get; set; } // The prompt used to generate this template
}
