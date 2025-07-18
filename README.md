# SpeedyOS - Multi-Tenant B2B No-Code Platform for HVAC Field Service Management

SpeedyOS is a comprehensive white-label platform for field service management, specifically designed for HVAC businesses. It provides a no-code environment for creating custom applications, workflows, and forms.

## Architecture

- **UI and Data Modeling**: NocoBase
- **Authentication**: Clerk
- **Workflow Automation**: n8n
- **Custom UI Components**: Enhanced form experiences

## Features

- Multi-tenant architecture for B2B SaaS deployment
- White-labeling capabilities for reselling
- No-code form and workflow builders
- HVAC-specific templates and components
- Field service management tools
- Mobile-friendly interface
- Integration capabilities with third-party services

## Project Structure

- `/backend`: NocoBase server with HVAC service plugin
- `/frontend`: NocoBase client with custom UI components
- `/integrations`: Connectors for Clerk and n8n
- `/config`: Configuration files for multi-tenancy
- `/docs`: Documentation

## Getting Started

### Prerequisites

- Node.js 16+
- Yarn
- SQLite (for development) or PostgreSQL/MySQL (for production)
- Clerk account for authentication
- n8n instance for workflow automation

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/speedymep/SpeedyOS.git
   cd SpeedyOS
   ```

2. Install dependencies:
   ```
   cd backend/hvac-service-app
   yarn install
   ```

3. Configure environment variables:
   Edit the `.env` file in the `backend/hvac-service-app` directory:
   ```
   # Authentication Configuration
   AUTH_PROVIDER=clerk
   CLERK_API_KEY=your_clerk_api_key
   CLERK_FRONTEND_API=your_clerk_frontend_api

   # n8n Integration
   N8N_API_URL=your_n8n_api_url
   N8N_API_KEY=your_n8n_api_key

   # Multi-tenant Configuration (optional)
   ALLOW_MULTI_TENANT=true
   TENANT_DOMAIN_PATTERN=*.speedyos.com
   ```

4. Install NocoBase:
   ```
   yarn nocobase install
   ```

5. Start the development server:
   ```
   yarn dev
   ```

6. Access the application at http://localhost:12000

### Production Deployment

For production deployment, follow these steps:

1. Update the database configuration in `.env` to use PostgreSQL or MySQL
2. Build the application:
   ```
   yarn build
   ```
3. Start the production server:
   ```
   yarn start
   ```

## White Labeling

SpeedyOS supports white labeling through NocoBase's UI settings. You can customize:

- Logo
- Colors
- Company name
- Domain name (with multi-tenant setup)

## License

MIT# Additional information
