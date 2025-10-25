using LinkedInTemplateSystem.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace LinkedInTemplateSystem.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<MessageTemplate> MessageTemplates { get; set; }
    public DbSet<TemplateCategory> TemplateCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure MessageTemplate entity
        modelBuilder.Entity<MessageTemplate>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Content).IsRequired();
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Tags).HasMaxLength(50);
            entity.Property(e => e.AIPrompt).HasMaxLength(100);
            
            entity.HasOne(e => e.Category)
                  .WithMany(c => c.Templates)
                  .HasForeignKey(e => e.CategoryId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // Configure TemplateCategory entity
        modelBuilder.Entity<TemplateCategory>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Color).HasMaxLength(7);
            entity.Property(e => e.Icon).HasMaxLength(10);
        });

        // Seed initial data
        SeedData(modelBuilder);
    }

    private static void SeedData(ModelBuilder modelBuilder)
    {
        var seedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        
        // Seed categories
        modelBuilder.Entity<TemplateCategory>().HasData(
            new TemplateCategory
            {
                Id = 1,
                Name = "Networking",
                Description = "Templates for professional networking and introductions",
                Color = "#0077B5",
                Icon = "🤝",
                CreatedAt = seedDate,
                IsActive = true
            },
            new TemplateCategory
            {
                Id = 2,
                Name = "Sales Outreach",
                Description = "Templates for sales and business development",
                Color = "#28A745",
                Icon = "💼",
                CreatedAt = seedDate,
                IsActive = true
            },
            new TemplateCategory
            {
                Id = 3,
                Name = "Follow-up",
                Description = "Templates for following up on conversations",
                Color = "#FFC107",
                Icon = "📧",
                CreatedAt = seedDate,
                IsActive = true
            },
            new TemplateCategory
            {
                Id = 4,
                Name = "Thank You",
                Description = "Templates for expressing gratitude",
                Color = "#DC3545",
                Icon = "🙏",
                CreatedAt = seedDate,
                IsActive = true
            },
            new TemplateCategory
            {
                Id = 5,
                Name = "Job Search",
                Description = "Templates for job applications and career opportunities",
                Color = "#6F42C1",
                Icon = "💼",
                CreatedAt = seedDate,
                IsActive = true
            }
        );

        // Seed sample templates
        modelBuilder.Entity<MessageTemplate>().HasData(
            new MessageTemplate
            {
                Id = 1,
                Title = "Professional Introduction",
                Content = "Hi [Name],\n\nI hope this message finds you well. I came across your profile and was impressed by your experience in [Industry/Field]. I'd love to connect and learn more about your journey.\n\nBest regards,\n[Your Name]",
                Description = "A professional way to introduce yourself to new connections",
                CategoryId = 1,
                IsFavorite = true,
                UsageCount = 0,
                CreatedAt = seedDate,
                UpdatedAt = seedDate,
                Tags = "introduction,networking,professional",
                IsAIGenerated = false
            },
            new MessageTemplate
            {
                Id = 2,
                Title = "Sales Outreach - Product Demo",
                Content = "Hi [Name],\n\nI noticed you're working at [Company] in [Role]. I believe our [Product/Service] could help you [Specific Benefit]. Would you be interested in a brief 15-minute demo?\n\nBest,\n[Your Name]",
                Description = "Template for reaching out to potential customers",
                CategoryId = 2,
                IsFavorite = false,
                UsageCount = 0,
                CreatedAt = seedDate,
                UpdatedAt = seedDate,
                Tags = "sales,demo,outreach",
                IsAIGenerated = false
            },
            new MessageTemplate
            {
                Id = 3,
                Title = "Follow-up After Meeting",
                Content = "Hi [Name],\n\nIt was great meeting you at [Event/Meeting]. I enjoyed our conversation about [Topic]. As discussed, I'll [Action Item].\n\nLooking forward to staying in touch!\n\nBest,\n[Your Name]",
                Description = "Follow up after a meeting or event",
                CategoryId = 3,
                IsFavorite = true,
                UsageCount = 0,
                CreatedAt = seedDate,
                UpdatedAt = seedDate,
                Tags = "follow-up,meeting,networking",
                IsAIGenerated = false
            }
        );
    }
}
