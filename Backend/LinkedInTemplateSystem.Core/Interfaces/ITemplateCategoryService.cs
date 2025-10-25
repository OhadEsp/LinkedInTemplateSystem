using LinkedInTemplateSystem.Core.DTOs;

namespace LinkedInTemplateSystem.Core.Interfaces;

public interface ITemplateCategoryService
{
    Task<IEnumerable<TemplateCategoryDto>> GetAllCategoriesAsync();
    Task<TemplateCategoryDto?> GetCategoryByIdAsync(int id);
    Task<TemplateCategoryDto> CreateCategoryAsync(CreateTemplateCategoryDto createDto);
    Task<TemplateCategoryDto?> UpdateCategoryAsync(int id, UpdateTemplateCategoryDto updateDto);
    Task<bool> DeleteCategoryAsync(int id);
}
