# SpeedyOS - Multi-Tenant B2B No-Code App Builder Platform

SpeedyOS is a comprehensive no-code platform for building custom business applications. It provides a flexible and extensible framework for creating various types of applications, including field service management, CRM, project management, and more.

## Architecture

- **Core Modules**:
  - **Data Modeling**: Define and manage data models with custom fields, relationships, and validation
  - **UI Builder**: Create responsive user interfaces with drag-and-drop components
  - **Workflow Automation**: Design and execute business processes with a visual workflow editor
  - **Authentication**: Secure your applications with role-based access control
  - **Integrations**: Connect with third-party services and APIs

- **Plugins**: Extend the platform with additional functionality
  - **Field Service**: Components and templates for field service applications
  - **CRM**: Components and templates for CRM applications
  - **Project Management**: Components and templates for project management applications

- **Templates**: Pre-built application templates for common use cases
  - **HVAC Service**: Complete HVAC field service management application
  - **General Contractor**: General contractor management application
  - **IT Service Desk**: IT service desk application

## Features

- **No-Code Development**: Build applications without writing code
- **Multi-Tenant Architecture**: Support for B2B SaaS deployment
- **White-Labeling**: Customize the look and feel of your applications
- **Responsive Design**: Mobile-friendly interface
- **Extensible Framework**: Add custom components and integrations
- **Role-Based Access Control**: Secure your applications with fine-grained permissions
- **Workflow Automation**: Create complex business processes with a visual editor
- **Integration Capabilities**: Connect with third-party services and APIs

## Project Structure

- `/app-builder`: Core app builder platform
  - `/core`: Core modules (data-modeling, ui-builder, workflow, auth, integrations)
  - `/plugins`: Extension plugins for specific industries and use cases
  - `/templates`: Pre-built application templates
- `/backend`: Legacy NocoBase server with HVAC service plugin
- `/docs`: Documentation

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn
- PostgreSQL or MySQL (recommended for production)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/speedymep/SpeedyOS.git
   cd SpeedyOS
   ```

2. Install dependencies:
   ```
   cd app-builder
   yarn install
   ```

3. Start the development server:
   ```
   yarn dev
   ```

4. Access the application at http://localhost:12000

### Building Applications

1. **Define Data Models**: Create your data models using the Data Modeling tool
2. **Design UI**: Build your user interface using the UI Builder
3. **Create Workflows**: Automate business processes using the Workflow tool
4. **Configure Authentication**: Set up user roles and permissions
5. **Deploy**: Deploy your application to production

## Extending the Platform

You can extend the platform by creating custom plugins:

1. Create a new directory in the `plugins` folder
2. Implement your plugin using the Plugin API
3. Register your plugin in the App Builder

## License

MIT