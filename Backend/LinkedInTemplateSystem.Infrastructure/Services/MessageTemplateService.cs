using LinkedInTemplateSystem.Core.DTOs;
using LinkedInTemplateSystem.Core.Entities;
using LinkedInTemplateSystem.Core.Interfaces;
using LinkedInTemplateSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace LinkedInTemplateSystem.Infrastructure.Services;

public class MessageTemplateService : IMessageTemplateService
{
    private readonly ApplicationDbContext _context;
    private readonly IAIService _aiService;

    public MessageTemplateService(ApplicationDbContext context, IAIService aiService)
    {
        _context = context;
        _aiService = aiService;
    }

    public async Task<IEnumerable<MessageTemplateDto>> GetAllTemplatesAsync()
    {
        var templates = await _context.MessageTemplates
            .Include(t => t.Category)
            .OrderByDescending(t => t.UpdatedAt)
            .ToListAsync();

        return templates.Select(MapToDto);
    }

    public async Task<MessageTemplateDto?> GetTemplateByIdAsync(int id)
    {
        var template = await _context.MessageTemplates
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == id);

        return template != null ? MapToDto(template) : null;
    }

    public async Task<MessageTemplateDto> CreateTemplateAsync(CreateMessageTemplateDto createDto)
    {
        var template = new MessageTemplate
        {
            Title = createDto.Title,
            Content = createDto.Content,
            Description = createDto.Description,
            CategoryId = createDto.CategoryId,
            Tags = createDto.Tags,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.MessageTemplates.Add(template);
        await _context.SaveChangesAsync();

        // Reload with category
        await _context.Entry(template).Reference(t => t.Category).LoadAsync();
        return MapToDto(template);
    }

    public async Task<MessageTemplateDto?> UpdateTemplateAsync(int id, UpdateMessageTemplateDto updateDto)
    {
        var template = await _context.MessageTemplates
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (template == null) return null;

        template.Title = updateDto.Title;
        template.Content = updateDto.Content;
        template.Description = updateDto.Description;
        template.CategoryId = updateDto.CategoryId;
        template.IsFavorite = updateDto.IsFavorite;
        template.Tags = updateDto.Tags;
        template.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return MapToDto(template);
    }

    public async Task<bool> DeleteTemplateAsync(int id)
    {
        var template = await _context.MessageTemplates.FindAsync(id);
        if (template == null) return false;

        _context.MessageTemplates.Remove(template);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<MessageTemplateDto>> GetTemplatesByCategoryAsync(int categoryId)
    {
        var templates = await _context.MessageTemplates
            .Include(t => t.Category)
            .Where(t => t.CategoryId == categoryId)
            .OrderByDescending(t => t.UpdatedAt)
            .ToListAsync();

        return templates.Select(MapToDto);
    }

    public async Task<IEnumerable<MessageTemplateDto>> GetFavoriteTemplatesAsync()
    {
        var templates = await _context.MessageTemplates
            .Include(t => t.Category)
            .Where(t => t.IsFavorite)
            .OrderByDescending(t => t.UpdatedAt)
            .ToListAsync();

        return templates.Select(MapToDto);
    }

    public async Task<MessageTemplateDto> GenerateAITemplateAsync(GenerateTemplateDto generateDto)
    {
        var category = await _context.TemplateCategories.FindAsync(generateDto.CategoryId);
        var categoryName = category?.Name ?? "General";

        var generatedContent = await _aiService.GenerateTemplateAsync(
            generateDto.Prompt,
            generateDto.Context,
            generateDto.Tone
        );

        var template = new MessageTemplate
        {
            Title = $"AI Generated: {generateDto.Prompt}",
            Content = generatedContent,
            Description = $"AI-generated template for {categoryName}",
            CategoryId = generateDto.CategoryId,
            IsAIGenerated = true,
            AIPrompt = generateDto.Prompt,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.MessageTemplates.Add(template);
        await _context.SaveChangesAsync();

        // Reload with category
        await _context.Entry(template).Reference(t => t.Category).LoadAsync();
        return MapToDto(template);
    }

    public async Task<MessageTemplateDto> IncrementUsageCountAsync(int id)
    {
        var template = await _context.MessageTemplates
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (template == null) throw new ArgumentException("Template not found");

        template.UsageCount++;
        template.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return MapToDto(template);
    }

    public async Task<IEnumerable<MessageTemplateDto>> SearchTemplatesAsync(string searchTerm)
    {
        var templates = await _context.MessageTemplates
            .Include(t => t.Category)
            .Where(t => t.Title.Contains(searchTerm) ||
                       t.Content.Contains(searchTerm) ||
                       (t.Description != null && t.Description.Contains(searchTerm)) ||
                       (t.Tags != null && t.Tags.Contains(searchTerm)))
            .OrderByDescending(t => t.UpdatedAt)
            .ToListAsync();

        return templates.Select(MapToDto);
    }

    private static MessageTemplateDto MapToDto(MessageTemplate template)
    {
        return new MessageTemplateDto
        {
            Id = template.Id,
            Title = template.Title,
            Content = template.Content,
            Description = template.Description,
            CategoryId = template.CategoryId,
            CategoryName = template.Category.Name,
            CategoryColor = template.Category.Color,
            CategoryIcon = template.Category.Icon,
            IsFavorite = template.IsFavorite,
            UsageCount = template.UsageCount,
            CreatedAt = template.CreatedAt,
            UpdatedAt = template.UpdatedAt,
            Tags = template.Tags,
            IsAIGenerated = template.IsAIGenerated,
            AIPrompt = template.AIPrompt
        };
    }
}
