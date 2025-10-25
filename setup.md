# LinkedIn Template System - Setup Guide

## Prerequisites

- .NET 8.0 SDK
- Node.js 18+ and npm
- OpenAI API key (for AI template generation)

## Quick Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd Backend/LinkedInTemplateSystem.API

# Restore packages
dotnet restore

# Update appsettings.json with your OpenAI API key
# Replace "your-openai-api-key-here" with your actual OpenAI API key

# Create and seed database
dotnet ef database update

# Run the API
dotnet run
```

The API will be available at `https://localhost:5001` or `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend/linkedin-template-ui

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Update .env with your API URL if needed
# REACT_APP_API_URL=http://localhost:5000

# Start the development server
npm start
```

The frontend will be available at `http://localhost:3000`

## Configuration

### OpenAI API Key

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Update `Backend/LinkedInTemplateSystem.API/appsettings.json`:
   ```json
   {
     "OpenAI": {
       "ApiKey": "your-actual-api-key-here"
     }
   }
   ```

### Database

The application uses SQLite by default. To use a different database:

1. Update the connection string in `appsettings.json`
2. Install the appropriate EF Core provider
3. Update the DbContext configuration

## Features

### ✅ Implemented
- Message template CRUD operations
- Template categories with icons and colors
- AI-powered template generation using OpenAI
- LinkedIn-like UI with modern design
- Template search and filtering
- Favorites system
- Usage analytics
- Template preview with placeholder replacement
- Copy to clipboard functionality

### 🎯 Key Components
- **DMChat**: Main chat interface with template button
- **TemplateModal**: Template selection and management
- **TemplateCard**: Individual template display
- **CreateTemplateModal**: Template creation form
- **AIGenerateModal**: AI-powered template generation

### 🔧 API Endpoints
- `GET /api/messagetemplates` - Get all templates
- `POST /api/messagetemplates` - Create template
- `PUT /api/messagetemplates/{id}` - Update template
- `DELETE /api/messagetemplates/{id}` - Delete template
- `POST /api/messagetemplates/generate` - Generate AI template
- `GET /api/templatecategories` - Get categories

## Usage

1. **Using Templates**: Click the sparkles button in the chat input to open the template modal
2. **Creating Templates**: Use the "Create Template" button to add custom templates
3. **AI Generation**: Use the "AI Generate" tab to create templates with AI assistance
4. **Search & Filter**: Use the search bar and category filters to find templates
5. **Favorites**: Mark frequently used templates as favorites for quick access

## Customization

### Adding New Categories
Categories are seeded in the database. To add new ones:
1. Update the `SeedData` method in `ApplicationDbContext.cs`
2. Or use the API to create new categories

### Styling
The app uses Tailwind CSS with LinkedIn-inspired colors. Customize in:
- `tailwind.config.js` - Color scheme and theme
- `src/index.css` - Global styles and animations

### AI Prompts
Customize AI generation prompts in `OpenAIService.cs` to match your specific use cases.

## Troubleshooting

### Common Issues

1. **API Connection Error**: Ensure the backend is running and CORS is configured
2. **AI Generation Fails**: Check your OpenAI API key and internet connection
3. **Database Issues**: Ensure SQLite is properly installed and accessible

### Development Tips

- Use browser dev tools to inspect API calls
- Check the browser console for React errors
- Use the Swagger UI at `/swagger` for API testing
- Enable detailed logging in `appsettings.json`

## Production Deployment

### Backend
- Use a production database (SQL Server, PostgreSQL)
- Configure proper CORS origins
- Set up HTTPS
- Use environment variables for sensitive data

### Frontend
- Build for production: `npm run build`
- Serve static files with a web server
- Configure proper API URLs for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and demonstration purposes.
