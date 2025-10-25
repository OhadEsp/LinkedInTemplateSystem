namespace LinkedInTemplateSystem.Core.DTOs;

public class MessageTemplateDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string CategoryColor { get; set; } = string.Empty;
    public string CategoryIcon { get; set; } = string.Empty;
    public bool IsFavorite { get; set; }
    public int UsageCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? Tags { get; set; }
    public bool IsAIGenerated { get; set; }
    public string? AIPrompt { get; set; }
}

public class CreateMessageTemplateDto
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public string? Tags { get; set; }
}

public class UpdateMessageTemplateDto
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public bool IsFavorite { get; set; }
    public string? Tags { get; set; }
}

public class GenerateTemplateDto
{
    public string Prompt { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public string? Context { get; set; }
    public string? Tone { get; set; } = "Professional";
}
