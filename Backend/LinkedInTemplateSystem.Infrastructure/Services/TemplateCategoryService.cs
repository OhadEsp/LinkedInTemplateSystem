using LinkedInTemplateSystem.Core.DTOs;
using LinkedInTemplateSystem.Core.Entities;
using LinkedInTemplateSystem.Core.Interfaces;
using LinkedInTemplateSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LinkedInTemplateSystem.Infrastructure.Services;

public class TemplateCategoryService : ITemplateCategoryService
{
    private readonly ApplicationDbContext _context;

    public TemplateCategoryService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TemplateCategoryDto>> GetAllCategoriesAsync()
    {
        var categories = await _context.TemplateCategories
            .Where(c => c.IsActive)
            .Include(c => c.Templates)
            .OrderBy(c => c.Name)
            .ToListAsync();

        return categories.Select(MapToDto);
    }

    public async Task<TemplateCategoryDto?> GetCategoryByIdAsync(int id)
    {
        var category = await _context.TemplateCategories
            .Include(c => c.Templates)
            .FirstOrDefaultAsync(c => c.Id == id);

        return category != null ? MapToDto(category) : null;
    }

    public async Task<TemplateCategoryDto> CreateCategoryAsync(CreateTemplateCategoryDto createDto)
    {
        var category = new TemplateCategory
        {
            Name = createDto.Name,
            Description = createDto.Description,
            Color = createDto.Color,
            Icon = createDto.Icon,
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };

        _context.TemplateCategories.Add(category);
        await _context.SaveChangesAsync();

        return MapToDto(category);
    }

    public async Task<TemplateCategoryDto?> UpdateCategoryAsync(int id, UpdateTemplateCategoryDto updateDto)
    {
        var category = await _context.TemplateCategories
            .Include(c => c.Templates)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category == null) return null;

        category.Name = updateDto.Name;
        category.Description = updateDto.Description;
        category.Color = updateDto.Color;
        category.Icon = updateDto.Icon;
        category.IsActive = updateDto.IsActive;

        await _context.SaveChangesAsync();
        return MapToDto(category);
    }

    public async Task<bool> DeleteCategoryAsync(int id)
    {
        var category = await _context.TemplateCategories.FindAsync(id);
        if (category == null) return false;

        // Check if category has templates
        var hasTemplates = await _context.MessageTemplates.AnyAsync(t => t.CategoryId == id);
        if (hasTemplates)
        {
            // Soft delete - mark as inactive instead of hard delete
            category.IsActive = false;
            await _context.SaveChangesAsync();
        }
        else
        {
            // Hard delete if no templates
            _context.TemplateCategories.Remove(category);
            await _context.SaveChangesAsync();
        }

        return true;
    }

    private static TemplateCategoryDto MapToDto(TemplateCategory category)
    {
        return new TemplateCategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            Color = category.Color,
            Icon = category.Icon,
            CreatedAt = category.CreatedAt,
            IsActive = category.IsActive,
            TemplateCount = category.Templates.Count
        };
    }
}
