using LinkedInTemplateSystem.Core.DTOs;

namespace LinkedInTemplateSystem.Core.Interfaces;

public interface IMessageTemplateService
{
    Task<IEnumerable<MessageTemplateDto>> GetAllTemplatesAsync();
    Task<MessageTemplateDto?> GetTemplateByIdAsync(int id);
    Task<MessageTemplateDto> CreateTemplateAsync(CreateMessageTemplateDto createDto);
    Task<MessageTemplateDto?> UpdateTemplateAsync(int id, UpdateMessageTemplateDto updateDto);
    Task<bool> DeleteTemplateAsync(int id);
    Task<IEnumerable<MessageTemplateDto>> GetTemplatesByCategoryAsync(int categoryId);
    Task<IEnumerable<MessageTemplateDto>> GetFavoriteTemplatesAsync();
    Task<MessageTemplateDto> GenerateAITemplateAsync(GenerateTemplateDto generateDto);
    Task<MessageTemplateDto> IncrementUsageCountAsync(int id);
    Task<IEnumerable<MessageTemplateDto>> SearchTemplatesAsync(string searchTerm);
}
