namespace LinkedInTemplateSystem.Core.Interfaces;

public interface IAIService
{
    Task<string> GenerateTemplateAsync(string prompt, string context = "", string tone = "Professional");
    Task<IEnumerable<string>> GenerateTemplateIdeasAsync(string category, string context = "");
}
