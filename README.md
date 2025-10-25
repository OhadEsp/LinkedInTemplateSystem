# LinkedIn DM Template System

A modern web application: message template system for LinkedIn DMs. This system allows users to create, manage, and use message templates with AI-powered template generation.

## Features

- **Template Management**: Create, edit, delete, and organize message templates
- **AI Integration**: Generate new templates using AI
- **LinkedIn-like UI**: Modern, responsive interface similar to LinkedIn
- **Template Categories**: Organize templates by purpose (networking, sales, follow-up, etc.)
- **Template Analytics**: Track usage and mark favorites
- **Real-time Updates**: Instant template synchronization

## Tech Stack

### Backend
- **C# ASP.NET Core 8.0** - Web API
- **Entity Framework Core** - Database ORM
- **SQLite** - Database (easily switchable to SQL Server/PostgreSQL)
- **OpenAI API** - AI template generation

### Frontend
- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Query** - Data fetching and caching

## Project Structure

```
LinkedInTemplateSystem/
├── Backend/
│   ├── LinkedInTemplateSystem.API/
│   ├── LinkedInTemplateSystem.Core/
│   └── LinkedInTemplateSystem.Infrastructure/
├── Frontend/
│   └── linkedin-template-ui/
└── README.md
```

## Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js 18+
- npm or yarn

### Backend Setup
1. Navigate to `Backend/LinkedInTemplateSystem.API`
2. Run `dotnet restore`
3. Update `appsettings.json` with your OpenAI API key
4. Run `dotnet ef database update`
5. Run `dotnet run`

### Frontend Setup
1. Navigate to `Frontend/linkedin-template-ui`
2. Run `npm install`
3. Run `npm start`

## API Endpoints

- `GET /api/templates` - Get all templates
- `POST /api/templates` - Create new template
- `PUT /api/templates/{id}` - Update template
- `DELETE /api/templates/{id}` - Delete template
- `POST /api/templates/generate` - Generate AI template
- `GET /api/categories` - Get template categories

## Environment Variables

Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000
```

Create `appsettings.json` in the backend:
```json
{
  "OpenAI": {
    "ApiKey": "your-openai-api-key"
  }
}
```
