using LinkedInTemplateSystem.Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text;

namespace LinkedInTemplateSystem.Infrastructure.Services;

public class OpenAIService : IAIService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly string _apiKey;

    public OpenAIService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _apiKey = _configuration["OpenAI:ApiKey"] ?? throw new ArgumentNullException("OpenAI:ApiKey");
        
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
    }

    public async Task<string> GenerateTemplateAsync(string prompt, string context = "", string tone = "Professional")
    {
        var systemPrompt = @"You are a professional LinkedIn messaging expert. Generate high-quality, personalized LinkedIn message templates that are:
- Professional yet conversational
- Personalized and specific
- Under 200 words
- Include placeholders like [Name], [Company], [Role] for customization
- Follow LinkedIn best practices
- Avoid being overly salesy or pushy

Return only the message content, no additional formatting or explanations.";

        var userPrompt = $"Generate a LinkedIn message template for: {prompt}";
        if (!string.IsNullOrEmpty(context))
        {
            userPrompt += $"\n\nContext: {context}";
        }
        userPrompt += $"\n\nTone: {tone}";

        var requestBody = new
        {
            model = "gpt-3.5-turbo",
            messages = new[]
            {
                new { role = "system", content = systemPrompt },
                new { role = "user", content = userPrompt }
            },
            max_tokens = 300,
            temperature = 0.7
        };

        var json = JsonConvert.SerializeObject(requestBody);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        try
        {
            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var responseObject = JsonConvert.DeserializeObject<dynamic>(responseContent);

            return responseObject?.choices?[0]?.message?.content?.ToString() ?? "Unable to generate template.";
        }
        catch (Exception ex)
        {
            // Fallback to a generic template if AI service fails
            return GenerateFallbackTemplate(prompt, tone);
        }
    }

    public async Task<IEnumerable<string>> GenerateTemplateIdeasAsync(string category, string context = "")
    {
        var systemPrompt = @"You are a creative LinkedIn messaging strategist. Generate 5 creative and specific LinkedIn message template ideas for the given category. Each idea should be:
- Specific and actionable
- Professional
- Include the target audience
- Mention the goal/purpose

Return as a JSON array of strings, each string being a brief idea description.";

        var userPrompt = $"Generate 5 LinkedIn message template ideas for the category: {category}";
        if (!string.IsNullOrEmpty(context))
        {
            userPrompt += $"\n\nContext: {context}";
        }

        var requestBody = new
        {
            model = "gpt-3.5-turbo",
            messages = new[]
            {
                new { role = "system", content = systemPrompt },
                new { role = "user", content = userPrompt }
            },
            max_tokens = 400,
            temperature = 0.8
        };

        var json = JsonConvert.SerializeObject(requestBody);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        try
        {
            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var responseObject = JsonConvert.DeserializeObject<dynamic>(responseContent);

            var ideasText = responseObject?.choices?[0]?.message?.content?.ToString();
            if (!string.IsNullOrEmpty(ideasText))
            {
                try
                {
                    var ideas = JsonConvert.DeserializeObject<string[]>(ideasText);
                    return ideas ?? new[] { "Unable to generate ideas." };
                }
                catch
                {
                    // If JSON parsing fails, return fallback ideas
                    return GenerateFallbackIdeas("general");
                }
            }
        }
        catch (Exception ex)
        {
            // Fallback ideas
        }

        return GenerateFallbackIdeas(category);
    }

    private static string GenerateFallbackTemplate(string prompt, string tone)
    {
        return $"Hi [Name],\n\nI hope this message finds you well. {prompt}\n\nI'd love to connect and learn more about your experience.\n\nBest regards,\n[Your Name]";
    }

    private static IEnumerable<string> GenerateFallbackIdeas(string category)
    {
        return category.ToLower() switch
        {
            "networking" => new[]
            {
                "Professional introduction to industry peers",
                "Reconnecting with former colleagues",
                "Reaching out to thought leaders in your field",
                "Connecting with potential mentors",
                "Building relationships with industry influencers"
            },
            "sales" => new[]
            {
                "Product demo request for qualified leads",
                "Case study sharing with prospects",
                "Industry insights sharing with potential clients",
                "Event invitation for prospects",
                "Follow-up after initial contact"
            },
            "follow-up" => new[]
            {
                "Following up after a meeting or call",
                "Checking in after sending a proposal",
                "Reconnecting after a networking event",
                "Following up on a job application",
                "Thank you message after a successful project"
            },
            _ => new[]
            {
                "Professional introduction message",
                "Industry insights sharing",
                "Event or webinar invitation",
                "Thank you and appreciation message",
                "Follow-up and next steps message"
            }
        };
    }
}
