using LinkedInTemplateSystem.Core.DTOs;
using LinkedInTemplateSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LinkedInTemplateSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TemplateCategoriesController : ControllerBase
{
    private readonly ITemplateCategoryService _categoryService;

    public TemplateCategoriesController(ITemplateCategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TemplateCategoryDto>>> GetAllCategories()
    {
        var categories = await _categoryService.GetAllCategoriesAsync();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TemplateCategoryDto>> GetCategory(int id)
    {
        var category = await _categoryService.GetCategoryByIdAsync(id);
        if (category == null)
            return NotFound();

        return Ok(category);
    }

    [HttpPost]
    public async Task<ActionResult<TemplateCategoryDto>> CreateCategory(CreateTemplateCategoryDto createDto)
    {
        var category = await _categoryService.CreateCategoryAsync(createDto);
        return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TemplateCategoryDto>> UpdateCategory(int id, UpdateTemplateCategoryDto updateDto)
    {
        var category = await _categoryService.UpdateCategoryAsync(id, updateDto);
        if (category == null)
            return NotFound();

        return Ok(category);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCategory(int id)
    {
        var result = await _categoryService.DeleteCategoryAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
