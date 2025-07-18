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
   The `.env` file in the `backend/hvac-service-app` directory is already configured with Clerk API keys:
   ```
   # Authentication Configuration
   AUTH_PROVIDER=clerk
   CLERK_API_KEY=sk_test_wYBxdIO9dF4gJscva7bLuEBH6XavZa3I1n9xdh7F2V
   CLERK_FRONTEND_API=pk_test_bW9yYWwtc3VuZmlzaC05Ni5jbGVyay5hY2NvdW50cy5kZXYk
   ```

4. Set up n8n (Option 1 - Docker):
   ```
   # Start n8n using Docker Compose
   docker-compose up -d n8n
   
   # Run the setup script to configure n8n
   ./scripts/setup-n8n.sh
   ```

   Set up n8n (Option 2 - Manual):
   ```
   # Install n8n globally
   npm install n8n -g
   
   # Start n8n
   n8n start
   ```
   Then visit http://localhost:5678 to set up workflows and generate an API key.

5. Install NocoBase:
   ```
   cd backend/hvac-service-app
   yarn nocobase install
   ```

6. Start the development server:
   ```
   yarn dev
   ```

7. Access the application at http://localhost:12000

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
