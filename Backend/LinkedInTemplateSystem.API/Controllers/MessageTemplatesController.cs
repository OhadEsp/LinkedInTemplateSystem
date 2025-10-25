using LinkedInTemplateSystem.Core.DTOs;
using LinkedInTemplateSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LinkedInTemplateSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessageTemplatesController : ControllerBase
{
    private readonly IMessageTemplateService _templateService;

    public MessageTemplatesController(IMessageTemplateService templateService)
    {
        _templateService = templateService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MessageTemplateDto>>> GetAllTemplates()
    {
        var templates = await _templateService.GetAllTemplatesAsync();
        return Ok(templates);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MessageTemplateDto>> GetTemplate(int id)
    {
        var template = await _templateService.GetTemplateByIdAsync(id);
        if (template == null)
            return NotFound();

        return Ok(template);
    }

    [HttpPost]
    public async Task<ActionResult<MessageTemplateDto>> CreateTemplate(CreateMessageTemplateDto createDto)
    {
        var template = await _templateService.CreateTemplateAsync(createDto);
        return CreatedAtAction(nameof(GetTemplate), new { id = template.Id }, template);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<MessageTemplateDto>> UpdateTemplate(int id, UpdateMessageTemplateDto updateDto)
    {
        var template = await _templateService.UpdateTemplateAsync(id, updateDto);
        if (template == null)
            return NotFound();

        return Ok(template);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTemplate(int id)
    {
        var result = await _templateService.DeleteTemplateAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }

    [HttpGet("category/{categoryId}")]
    public async Task<ActionResult<IEnumerable<MessageTemplateDto>>> GetTemplatesByCategory(int categoryId)
    {
        var templates = await _templateService.GetTemplatesByCategoryAsync(categoryId);
        return Ok(templates);
    }

    [HttpGet("favorites")]
    public async Task<ActionResult<IEnumerable<MessageTemplateDto>>> GetFavoriteTemplates()
    {
        var templates = await _templateService.GetFavoriteTemplatesAsync();
        return Ok(templates);
    }

    [HttpPost("generate")]
    public async Task<ActionResult<MessageTemplateDto>> GenerateAITemplate(GenerateTemplateDto generateDto)
    {
        var template = await _templateService.GenerateAITemplateAsync(generateDto);
        return Ok(template);
    }

    [HttpPost("{id}/use")]
    public async Task<ActionResult<MessageTemplateDto>> UseTemplate(int id)
    {
        try
        {
            var template = await _templateService.IncrementUsageCountAsync(id);
            return Ok(template);
        }
        catch (ArgumentException)
        {
            return NotFound();
        }
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<MessageTemplateDto>>> SearchTemplates([FromQuery] string q)
    {
        if (string.IsNullOrWhiteSpace(q))
            return BadRequest("Search query is required");

        var templates = await _templateService.SearchTemplatesAsync(q);
        return Ok(templates);
    }
}
