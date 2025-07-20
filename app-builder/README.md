# SpeedyOS App Builder

SpeedyOS App Builder is a comprehensive no-code platform for building custom business applications. It provides a flexible and extensible framework for creating various types of applications, including field service management, CRM, project management, and more.

## Core Features

- **Data Modeling**: Create and manage data models with custom fields, relationships, and validation rules
- **UI Builder**: Design responsive user interfaces with drag-and-drop components
- **Workflow Automation**: Create complex business processes with a visual workflow editor
- **Authentication & Authorization**: Secure your applications with role-based access control
- **Integrations**: Connect with third-party services and APIs
- **Multi-tenancy**: Support for multi-tenant SaaS deployments
- **White-labeling**: Customize the look and feel of your applications

## Architecture

The SpeedyOS App Builder is built with a modular architecture:

- **Core**: The foundation of the platform, providing essential services
  - **data-modeling**: Define and manage data models
  - **ui-builder**: Create and customize user interfaces
  - **workflow**: Design and execute business processes
  - **auth**: Handle authentication and authorization
  - **integrations**: Connect with external services
  
- **Plugins**: Extend the platform with additional functionality
  - **field-service**: Components and templates for field service applications
  - **crm**: Components and templates for CRM applications
  - **project-management**: Components and templates for project management applications

- **Templates**: Pre-built application templates for common use cases
  - **hvac-service**: Complete HVAC field service management application
  - **general-contractor**: General contractor management application
  - **it-service-desk**: IT service desk application

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn
- PostgreSQL or MySQL (recommended for production)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/speedymep/SpeedyOS.git
   cd SpeedyOS/app-builder
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Start the development server:
   ```
   yarn dev
   ```

4. Access the application at http://localhost:12000

## Creating an Application

1. Define your data models using the Data Modeling tool
2. Design your UI using the UI Builder
3. Create workflows using the Workflow Automation tool
4. Configure authentication and authorization
5. Deploy your application

## Extending the Platform

You can extend the platform by creating custom plugins:

1. Create a new directory in the `plugins` folder
2. Implement your plugin using the Plugin API
3. Register your plugin in the App Builder

## License

MIT